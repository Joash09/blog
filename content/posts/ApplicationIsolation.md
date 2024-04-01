+++
title = "Chroot jails and systemd-spawn"
author = ["Joash Naidoo"]
date = 2022-07-11T00:00:00+02:00
tags = ["Virtualization", "Isolation", "containers", "chroot", "systemd"]
draft = false
+++

Containers and application isolation were massive developments in computing. This technology provides a number of useful benefits for developers and end-users alike, ranging from portability to security. I recently needed these benefits when I wanted to install Steam and NVIDIA drivers without interfering with my main system. Here I explore a couple of approaches more basic than Docker to understand the technology from first principals.

<!--more-->

As it stands, the NVIDIA drivers were installed as kernel modules against a second kernel. This process is documented on the Gentoo Wiki. The next step is to create an isolated Steam installation. The first option is to use containers with Docker, however Steam does not provide an official Docker image. Second option is something like Flatpak, but that would come with needing to rebuild my kernel to support Flatpak. Additionally, I won't use Flatpak for anything else so this seems unnecessary. Thus we arrive at building a chroot environment. Chroot is a builtin minimal tool which provides the level of isolation I want without the overhead of a full container.


## chroot {#chroot}

Almost all developers use containers within their development and production workflows. It is well understood containers provide an isolated environment with is own file structure and its own operating system. What's lesser known is if we wanted to just isolate the file directory we can do so without Docker. The chroot environment still uses the same operating system as the host system but cannot access files outside its own file directory.


### Steps to create chroot environment {#steps-to-create-chroot-environment}

The steps to create a chroot environment are outlined on [Gentoo Wiki](https:https://wiki.gentoo.org/wiki/Chroot), so I don't want to copy paste it here. However, at a high level they are:

1.  Create directory for chroot environment
2.  Unpack system files. There are tools you can install for certain distributions to do this for you like arch-root (Arch) or debootstrap (Debian-based). For Gentoo you extract the stage3 tar

<!--listend-->

```bash
sudo tar xpvf Downloads/stage3-amd64-systemd-*.tar.xz --xattrs-include='*.*' --numeric-owner -C /mnt/mychroot
```

1.  Mount system directories (e.g. /dev, /proc, /run etc.) [see wiki]
2.  Enter environment
    ```bash
    chroot /mnt/mychroot /bin/bash
    env-update && . /etc/profile
    export PS1="(chroot) $PS1"
    ```
3.  "exit" to exit
4.  Should remember to unmount system directories

Mounting and unmounting the system directories is the most tedious process and one can create a script to do this automatically. However systemd users have the following option available to them.


## systemd-nspawn (chroot on steroids) {#systemd-nspawn--chroot-on-steroids}

Most Linux tinkers have heard of systemd. It is the init system widely used Linux distro like Canonical's Ubuntu. As the name suggests the init system is the first program the kernel loads. The init system is responsible for managing all the services and processes started by the user. systemd also offers other tools including system logging (journalctl) and, as we will discuss now, systemd-nspawn.

Systemd-nspawn offers a simple way to create lightweight containers for you. Unlike the chroot jail, processes run within the nspawn container are isolated from the main system (i.e. PID 1 in container is different to PID 1 on the host and yes, you can have a separate init system within the nspawn container). I was drawn to nspawn because it handles the process of (un)mounting the required directories for you. It also offers additional protection in this regard as the container cannot change the /proc or /sys directories or mount private /dev and /run directories which are meant to be inaccessible from outside the container.


### Steps to create systemd-nspawn container {#steps-to-create-systemd-nspawn-container}

1.  Create directory for chroot environment
2.  Unpack system files. There are tools you can install for certain distributions to do this for you like arch-root (Arch) or debootstrap (Debian-based). For Gentoo you extracting the stage3 tar (same as defined in chroot section)
3.  Enter environment
    ```bash
    sudo systemd-nspawn -D /mnt/mychroot
    ```


### Display Server Options {#display-server-options}

The were additional things I needed to take note of when using nspawn for running Steam. To display applications from the container there are two options available.


#### xhost {#xhost}

xhost is an additional package that allows local connections to connect to the host display server. Although this is a simple solution, it poses a security threat. xhost can grant anyone access to the display server without authentication. From there, an attacker could run key logger or other malicious software. Steps for this route is to install the xhost package and run the following command:

```bash
xhost +local: # allow local connections (i.e. from the container)
```


#### xephyr {#xephyr}

Alternatively, Xephyr is a compile option in the Xorg package which creates nested X display environments. A single command can then spin up a new display (e.g. named ":1") and we can specify which display the container should use (i.e. DISPLAY=:1). This, I believe, is a more secure approach and is what I used in my final setup.

```bash
Xephyr :1 -resizeable & # Run nested X server in background

systemd-nspawn \
    --setenv=DISPLAY=:1 \
    --bind-ro /tmp/.X11-unix/X1 \
    -D /mnt/mychroot
```


### Final start up script and container options {#final-start-up-script-and-container-options}

Similarly to the display server, for audio I needed to link the host pulse server instance to the container. There was also a huge bunch of /dev (device) files which needed to be linked for NVIDIA drivers to work. Lastly I also had to bind the directory with all my steam games.

```bash
Xephyr :1 -resizeable & # Run nested X server in background
sleep 2
export TERM=xTERM # option to get a game working

systemd-nspawn \
	--setenv=DISPLAY=:1 \
	--setenv=PULSE_SERVER=unix:/run/user/host/pulse/native \

    # bind for nested display
    --bind-ro /tmp/.X11-unix/X1 \

    # gentoo thing for installing packages
	--bind /var/db/repos/gentoo/ \

    # NVIDIA devices
	--bind=/dev/dri/ \
	--bind=/dev/shm/ \
	--bind=/dev/nvidia0 \
	--bind=/dev/nvidiactl \
	--bind=/dev/nvidia-modeset \
	--bind=/dev/snd/ \

    # For sound link to host pulseaudio
	--bind=/run/user/1000/pulse/:/run/user/host/pulse \

    # where steam games located
	--bind=/mnt/MyStorage/ \

    # chroot directory
	-D /usr/local/steam64/ \

    # user to login as (must belong to video and audio group)
	-u steam
```


## Updating Kernels, Drivers inside a systemd-nspawn container {#updating-kernels-drivers-inside-a-systemd-nspawn-container}

It is apparent that nspawn containers do not are not running their own kernel. However, steam requires a the built NVIDIA drivers within the container. Furthermore, the NVIDIA drivers are built against the kernel. To ensure everything matches between the host system and the container, first copy the kernel sources from the host system to the container. Ensure the /usr/src/linux directory is linked correctly to this copied version (use eselect tool if on Gentoo). Ensure the NVIDIA driver version in the container matches the host system. (Mask the correct version if on Gentoo).


## Final Thoughts {#final-thoughts}

Containers are a great way to isolate applications from the rest of the system. I have created containers to isolate Steam and Discord due to the size and specific demands of their dependencies. These demands include limiting certain versions of other libraries and just causes greater risk of breaking my system later. Of course, mainstream options like Flatpak are available and possibly easier to use; however I enjoyed using these more minimal, first-principals approaches.

+++
title = "Towards a home computing lab with KVM and QEMU"
author = ["Joash Naidoo"]
date = 2023-08-08T00:00:00+02:00
tags = ["Virtualization", "KVM", "LVM", "Linux", "Networking", "QEMU", "VFIO", "IOMMU"]
draft = false
+++

Virtualization is one of the backbones to cloud computing. The technology enables us to use hardware more efficiently and for a wider number of applications. Understanding virtualization requires careful study of the hardware capabilities of your system, the responsibilities of operating systems as well as a bit of networking. In this post I outline a Linux based setup for hosting virtual machines. The skills developed here will serve us when building a dedicated home server later.

<!--more-->


## Introduction {#introduction}

The main component of a computing system is the operating system. The operating system is responsible for managing and sharing computing resources amoungst the users' applications. This simplifies the concerns of the application developer. The application developer rarely needs to consider the what hardware configurations the user may have, how to interact with that hardware or even consider how to share that hardware with the other applications the user may be running. The operating system achieves this separation of concerns by providing the applications a unified (abstracted) view of the hardware. For example, instead of an application writing to the actual physical memory addresses, the operating system will provide the application with virtual addresses. The operating system manages CPU processing, so applications developers can write their programs as if their application will be the only programs running on the system. We can think of this as the operating system providing the applications with a virtual CPU. Given these roles and examples, the operating system is also referred to as a virtual machine (VM).

One of the biggest breakthroughs in cloud computing, was the ability to host multiple operating systems (i.e VMs) on a single system. Hosting multiple VMs greatly improved cost efficiency since companies did not need to buy new hardware when deploying a new application on a separate VM. Hardware sharing could be tailored much more efficiently to meet the business' use cases. The technology used to host multiple VMs on shared hardware is called the "hypervisor." Originally, there are two types of hypervisor. Type 1 allows the guest VM to run very close to bare metal. The second slower type has to first translate instructions from a guest VM which is then handled by the host.

With all this in mind, I want to build by own "home lab" to replicate the ability to spin up multiple VMs. There are a number of ready made tools for this purpose such as VMWare's ESXI platform or Proxmox, but I think it is more interesting to build it from "scratch." Since type 2 hypervisors are too slow to be used in production servers I will be using a type 1 hypervisor. Between Windows' HyperV and Linux's KVM, I naturally opted with the latter.

The journey begins with setting up storage, specifically for easily hosting multiple VMs. Then I'll look at the main focus, understanding the technology underlying and implementing virtual machines. Finally, a look VPNs for network security between our computing resources (e.g. the VMs we will be spinning up).


## Logical Volume Manager {#logical-volume-manager}

Operating systems need to carve out their own space on the hard disk to store their file system and programs. This "carving out" of disk space is known as _partitioning_ the hard drive and, as anyone who has dual-booted the PC before would tell you, this is the most stressful part of the installation. When partitioning the hard drive, the sizes of the hard drive must be set a priori (i.e. known beforehand). Resizing partitions later is a tricky task, which requires migrating and deleting data. Another restriction with typical partitions is partitions cannot stretch over multiple disks. Since I want re-configurable control over my guest VM partitions I found a solution with Logical Volume Manager (LVM). LVM adds a layer of abstraction over the physical disks. Instead of multiple partitions, our drives are all contained in a single partition with type LVM. We can then use the LVM userspace program to create logical volumes out of all the LVM partitions on the disks. Again, with this layer of abstraction and the LVM userspace program, it is easy to allocate and resize space for the VMs we will be creating.


### LVM Overview {#lvm-overview}

There are three main structures:

-   Physical volumes
-   Volume groups
-   Logical volumes

Volume groups are the bridge between the physical world and the abstracted partitions we will be creating. Physical volumes (physical drivers) are assigned to volume groups and LVM partitions are created from volume groups. The typical processes for setting up LVM drives and managing LVM partitions is as follows:

```bash
fdisk /dev/mydrive
# Create new partition table and assign it type lvm

pvcreate vgmain /dev/mydrive # Create volume group vgmain and add /dev/mydrive to it
pvdisplay # list all physical volumes

lvcreate -n lvolubuntu -L 20G vgmain # Create logical volumes from volume group
lvcreate -n lvolwindows -L 20G vgmain
lvdisplay # list all logical volumes

vgchange -ay vgmain # Activate logical volumes

# Assign filesystem to logical volumes
mkfs -t ntfs /dev/vgmain/lvolwindows
mkfs.ext /dev/vgmain/lvolubuntu

# Resize paritions
lvreduce --resizefs -L -8G /dev/vgmain/lvolwindows # shrink lvolwindows lvm partition by 8 GB

lvextend -l +100%FREE /dev/vgmain/lvolubuntu # expand lvolubuntu lvm partition to fill rest of available space
```


### initramfs {#initramfs}

In order to boot from an LVM partition, the LVM userspace program must be loaded. However, this userspace program is located on the LVM partition we wish to boot. This creates a chicken and the egg situation. The workaround discussed here, is to use an initramfs system. The initramfs system is a minimal filesystem that is made available to the kernel on startup. This minimal filesystem will include the necessary programs needed by the kernel before the main filesystem is loaded. There are a handful of programs which can generate an initramfs for you such as dracut. I will outline the process for creating one from scratch.

The first step is decide what packages must be installed on the initramfs. The first is busybox which is a set of lightweight utilities which will give us some debugging control if the kernel fails to boot. Second, of course, is the LVM program. Note that to include these programs in the initramfs, these programs must be built using static libraries (i.e. the executable must have all the dependencies built in). Secondly, we will build the init script. This script will execute functionality not available to the kernel. In our use case this script will activate the LVM volumes, on which our kernel sits. The following code snippet illustrates building an initramfs.

```bash
# Run the following as root

# Create initramfs file structure
mkdir --parents /root/initramfs/{bin,dev,etc,lib,lib64,mnt/root,proc,root,sbin,sys}

# Copy busybox and LVM executables to initramfs
cp --archive /bin/busybox /root/initramfs/bin/busybox
cp --archive /sbin/lvm /usr/src/initramfs/sbin/lvm
```

The init script is simple. First define a function which will start a busybox shell. We will call this function if something fails. Secondly, mount the necessary filesystem directories namely: /proc, /sys and /dev. Thirdly use the lvm userspace program to search for and activate LVM logical volumes. Once that is done unmount those filesystem directories and use busybox's switch_root tool to hand over root control to the main kernel init directory.

```bash
#!/bin/busybox sh

rescue_shell() {

	echo "$@"
	echo "Something went wrong. Dropping you to a shell"

	/bin/busybox --install -s
	exec /bin/sh
}

mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -t devtmpfs devtmpfs /dev

lvm vgscan --mknodes -P || rescue_shell "Cannot scan volumne groups"
lvm lvchange --sysinit -a y -P vgmain/lvolhome || rescue_shell "Some/all volume groups failed to start"
lvm lvchange --sysinit -a y -P vgmain/lvolswap || rescue_shell "Some/all volume groups failed to start"
lvm vgscan --mknodes || rescue_shell "Cannot create wrapper for volume group"

mount -o ro /dev/mapper/vgmain-lvolhome /mnt/root

umount /proc
umount /sys
umount /dev

exec switch_root /mnt/root /sbin/init
```

Once built, prepare your initramfs and configure your bootloader to boot with it. The kernel source code provides a helper script to build your initramfs as a .cpio file. From there, we will compress it with gzip.

```bash
/usr/src/linux/usr/./gen_init_cpio <location_of_initramfs> .. # use script included in kernel source code
cd .. # Move up directory to newly created initramfs .cpio file
gzip <initramfs.cpio> # compress the initramfs
cp custom-initramfs.cpio.gz /boot # copy the compressed initramfs to the /boot directory
```

Next we must configure the GRUB2 bootloader to boot with the initramfs by using the configuration files available to use in the //etc/grub.d/10_linux configuration file. See the following code snippet for reference.

```bash
initrd_real=
for i in "initrd.img-${version}" "initrd-${version}.img" \
    "initrd-${alt_version}.img.old" "initrd-${version}.gz" \
    "initrd-${alt_version}.gz.old" "initrd-${version}" \
    "initramfs-${version}.img" "initramfs-${alt_version}.img.old" \
    "initrd.img-${alt_version}" "initrd-${alt_version}.img" \
    "initrd-${alt_version}" "initramfs-${alt_version}.img" \
    "initramfs-genkernel-${version}" \
    "initramfs-genkernel-${alt_version}" \
    "initramfs-genkernel-${GENKERNEL_ARCH}-${version}" \
    "initramfs-genkernel-${GENKERNEL_ARCH}-${alt_version}" \
    "custom-initramfs.cpio.gz"; do # <---- Add the name of your initramfs here
if test -e "${dirname}/${i}" ; then
    initrd_real="${i}"
    break
fi
done
```

Finally, remember to re-generate your GRUB2 configuration.


### Handling LVM swap partition {#handling-lvm-swap-partition}

```bash
# To view loaded swap partitions
cat /proc/swaps

# To activate a swap partition
swapon /dev/...<device>
```

I tried activating the swap partition within the initramfs but this doesn't work. The best solution thereafter is to use a systemd service to enable the swap partition at startup.

```bash
[Unit]
Description=Load my LVM swap partition

[Service]
Type=oneshot
ExecStart=swapon /dev/...

[Install]
WantedBy=multi-user.target
```


### Alternative: GRUB2 handles LVM {#alternative-grub2-handles-lvm}

GRUB2 is the de facto stage 2 bootloader for many Linux distributions. It has the advanced feature for booting from and loading home partitions that exist on LVM logical volumes. This, of course, bypasses the need for an initramfs however still requires some configuration from the user.


## Virtual Machines with KVM + QEMU {#virtual-machines-with-kvm-plus-qemu}


### KVM and QEMU {#kvm-and-qemu}

The Linux kernel is a monolithic kernel. However it supports dynamically loading in kernel modules which extend the functionality of the kernel (e.g. for example loading in a device driver). One of these modules is a type 1 hypervisor called the Kernel Virtual Machine (KVM).

QEMU is short for Quick Emulator. QEMU is a userspace program that is capable of emulating hardware through software or alternatively use KVM as a hypervisor backend to run virtualized environments. QEMU offers a lot of options when creating a VM. Options include the number of cores dedicted to the VM, the amount of memory and specifying other network and hardware device properties.

As with a normal installation of an operating system on a new machine, when booting a new VM, we will command QEMU mount both the installation media as a cdrom and the drive to which the new OS will be installed. QEMU allows us to boot the operating system from a either an image file on our existing filesystem and partition or boot directly from a disk partition. Since, we spent a significant time on LVM in the previous section, we will be booting directly from a LVM logical volume.

Given the number of configuration options, there are a number of front ends for QEMU which makes spinning up VMs far more simple. However, for now I want to do everything by hand.

```bash
#! /bin/bash
exec qemu-system-x86_64 -enable-kvm \
	-cpu host \
	-drive file=/dev/vgmain/lvolwindows,if=virtio \
	-net nic \
	-net user,hostname=windowsvm \
	-m 2G \
	-monitor stdio \
	-name "Windows" \
	"$@"
```


### Virtio Drivers {#virtio-drivers}

You will notice "virtio" appearing frequently in the QEMU scripts. virtio is the main platform for IO virtualization. In a virtualized operating system, IO operations may perform better if IO driver are _paravirtualized_ over full software virtualization. Paravirtualized drivers can leverage the host's (hypervisor) access to hardware decreasing latency. This write-up makes use of virtio drivers for block storage, USB peripherals, display outputs and networking.


### USB Passthrough {#usb-passthrough}

Devices connected to the host are not automatically made available to guest VMs. They are to be passed through. QEMU emulates a the USB chipset and USB devices are attached to this chipset. The latest chipset available is XHCI and supports USB1.0, USB2.0 to USB3.0. Below we see the steps for hot-swapping USB devices to the VM through QEMU's STDIO interface (i.e. terminal screen/prompt opened alongside the VM display). Please note passing sharing the host's keyboard and mouse USB devices with the VM will discussed in a later section.

```bash
# In separate terminal, get vendorid and productid
lsusb

# In the QEMU terminal ...
device_add nec-usb-xhci,id=xhci
device_add usb-host,bus=xhci.0,vendorid=0x4030,productid=0x6010 # Notice the hex format
```


### BIOS vs UEFI for VMs {#bios-vs-uefi-for-vms}

QEMU really aims to emulate all aspects of physical hardware. This includes the emulating whether your VM is booting with BIOS or UEFI firmware. UEFI is the newer specification and GPU passthrough requires it. By default, QEMU boots the VMs with SeaBIOS which emulates BIOS firmware. Intel has provided a reference UEFI specification referred to TianoCore EDK II and the Open Virtual Machine (OVMF) software package is an EDK II project which enables UEFI support for VMs. OVMF is installed as any regular package. Once installed, find the OVMF_CODE.fd and OVMF_VARS.fd files. Mine were installed in _usr/share/edk2-ovmf_. Enable UEFI support on your VM as follows:

```bash
qemu-system-x86_64 \
	-enable-kvm \
	-cpu 'host' \
	-m 4G \
	-drive if=pflash,format=raw,readonly=on,file=/usr/share/edk2-ovmf/OVMF_CODE.secboot.fd \
	-drive if=pflash,format=raw,file=/usr/share/edk2-ovmf/OVMF_VARS.fd \
	-serial none \
	-monitor stdio \
	-vga virtio
```


### GPU Passthrough with IOMMU and VFIO {#gpu-passthrough-with-iommu-and-vfio}

There are instances when we would want a guest virtual machine to have exclusive access to a hardware resource. My personal use case is for my guest Windows 10 VM to have exclusive access to my GPU to play computer games. Some devices, such as the GPU, access memory directly and are hence not designed for virtualization. Consider a guest VM with DMA access through a GPU, is not aware it is a guest VM and will overwrite memory used by the host or other VMs. To address this, we can make use of IO memory management units which isolates resources into groups and translates the physical addresses of available resources with a virtual addresses which is used by the guest VM. With these isolated IOMMU groups, the guest can be assigned exclusive access to the resources within one or more groups. Guest VMs can only be assigned groups and not individual resources given how they work together with DMA. Also consider that since the guest VM is given exclusive access to an IOMMU group which has the GPU, the CPU needs to have integrated graphics for the host VM to continue to work.

IOMMU functionality is offered at the CPU architectural level with implementations by Intel and AMD being VT-d and AMD-Vi respectively. To use IOMMU groups, the kernel must be built with the necessary IOMMU drivers. The drivers are found in Device Drivers -&gt; IOMMU Hardware support. The kernel will need to boot with the necessary command line parameters. To ensure all subsequent kernels upgrades include these parameters, please modify GRUB_CMDLINE_LINUX variable the /etc/default/grub file. Once updated rebuild your GRUB boot configuration and reboot.

```bash
# Append parameters to the linux kernel command line
GRUB_CMDLINE_LINUX="iommu=pt intel_iommu=on pcie_acs_override=downstream,multifunction"
```

To view all the devices and their assigned IOMMU group, you can run the following BASH script.

```bash
for d in /sys/kernel/iommu_groups/*/devices/*; do n=${d#*/iommu_groups/*}; n=${n%%/*}; printf 'IOMMU Group %s ' "$n"; lspci -nns "${d##*/}"; done;
```

IOMMU groups allows a guest VM to have exclusive access to a resource with direct memory access (DMA). The Virtual Function IO builds on this by providing a userspace driver to the guest VM, providing low latency and direct use of bare-metal drivers. VFIO must also be built into the kernel and is found in Device Drivers -&gt; VFIO Non-Privileged userspace driver framework. Once VFIO is compiled into the host's kernel, we can begin configuring the boot time kernel parameters for GPU passthrough.

As previously mentioned, a consequence of device passthrough is that the device will not be accessible to the host VM. The goal is now to blacklist the GPU device from being loaded by the host kernel. This will be achieved by assigning the devices to the vfio-pci kernel module.

Devices are identified by their vendor number IDs which can be obtained by the following command.

```bash
lspci -nn # Provides the address for all devices connected via PCI bus
```

Given the IDs provided by the command above, create a /etc/modprobe.d/vfio.conf file and assign the IDs to vfio-pci kernel module, and hence prevent the host kernel from loading these devices.

```bash
options vfio-pci ids=10de:1c02,10de:10f1

softdep nouveau pre: vfio-pci
softdep snd_hda_intel pre: vfio-pci

softdep nvidia pre: vfio-pci
softdep snd_hda_intel pre: vfio-pci
```

Reboot and verify the host kernel is not using the GPU device with the following command.

```bash
lspci -k
# For the GPU vga and audio device we should see: Kernel driver in use: vfio-pci
```


### Setting up QEMU for GPU passthrough {#setting-up-qemu-for-gpu-passthrough}

What is often overlooked in the many tutorials I worked through for GPU passthrough is how to share your host's keyboard and mouse with the VM which will be displayed on a different screen. I assume these tutorials make the assumption you have a separate keyboard and mouse that'll be passthrough using the USB passthrough steps outlined above. However, if you want to share your host's keyboard and mouse you can do so by sharing the devices' evdev driver with QEMU. Run the command below and try typing or moving your mouse. You have identified the device names if the characters are printed to screen after running the command below.

```bash
cat /dev/input/by-id/<device_name>
```

Finally, to pass the GPU device to the guest VM and share keyboard and mouse with the host, start QEMU with the following options. Once VM has started, you can switch keyboard and mouse input between host and VM by pressing left and right cntrl keys simultaneously.

```bash
exec qemu-system-x86_64 -enable-kvm \
	-nodefaults \
	-cpu host \
	-bios /usr/share/edk2-ovmf/OVMF_CODE.fd \
	-drive file=/dev/vgmain/lvolubuntu,if=virtio \
	-device nec-usb-xhci,id=xhci \
	-device usb-kbd \
	-device usb-mouse \
	-object input-linux,id=kbd1,evdev=/dev/input/by-id/usb-Cooler_Master_Technology_Inc._MasterKeys_Lite_L_Combo_Keyboard_KB_-event-kbd,grab_all=on,repeat=on  \
	-object input-linux,id=mouse1,evdev=/dev/input/by-id/usb-Cooler_Master_Technology_Inc._MasterKeys_Lite_L_Combo_Mouse-if01-event-mouse  \
	-device vfio-pci,host=01:00.0,x-vga=on,multifunction=on \
	-device vfio-pci,host=01:00.1 \
	-m 4G \
	-name "Ubuntu22" \
	-monitor stdio \
	-nographic \
	-vga none \
	"$@"
```


#### A Note about Windows {#a-note-about-windows}

The steps above got me to fully functioning Ubuntu VM with a dedicated graphics card. The same cannot be said for a Windows 10 or Windows 11 VM. Given GPU passthrough works on other Linux VMs I do not think there is problem with the host's setup, kernel or driver configuration. Instead I blame the driver within the Windows VM for not functioning as expected. Despite the VM having access to the graphics card, the setup knowing it is not running naively would refuse to work. I believe this was due to commercial reasons to NVIDIA could sell VM specific driver licenses. For this reason we need some additional parameters to trick the VM into thinking it is running natively. Note the "-cpu" and "-machine" options below. Despite these "hacky" attempts I have not been able to get video display through a dedicated passed through GPU.

```bash
exec qemu-system-x86_64 \
	-nodefaults \
	-enable-kvm \
	-cpu 'host,kvm=off,hv_vendor_id=null,hypervisor=off' \
	-machine 'type=q35,smm=on,kernel_irqchip=on' \
	-m 4G \
	-smp cores=4 \
	-drive file=/home/joash/VMs/virtio-win-0.1.229.iso,media=cdrom \
	-drive file=/home/joash/VMs/Win10_22H2_EnglishInternational_x64.iso,media=cdrom \
	-drive file=/dev/vgmain/lvolwindows,if=virtio \
	-drive if=pflash,format=raw,readonly=on,file=/usr/share/edk2-ovmf/OVMF_CODE.secboot.fd \
	-drive if=pflash,format=raw,file=/home/joash/VMs/MY_VARS.fd \
	-device vfio-pci,host=01:00.0,x-vga=on,multifunction=on \
	-device vfio-pci,host=01:00.1 \
	-monitor stdio \
	-net nic \
	-net user,hostname=windowsvm \
	-name "Windows10" \
  -nographic \
	-vga none \
	"$@"
```


#### A note about Windows 11 {#a-note-about-windows-11}

Windows 11 requires a BIOS which supports secure boot and a TPM device. The first of these requirements are fulfilled with OVMF software package discussed earlier. Just pass through the OVMF firmware file with "secboot" attached to it. Second, we need **swtmp** to emulate a TPM device, which is then simply installed via a package manager and added as a device on QEMU. Be sure to replace the "tmp" path with a path that will persist after rebooting.

```bash
$(dmidecode -s system-uuid)

mkdir /<path_to_tpm>/mytpm1
```

```bash
swtpm socket \
    --tpmstate dir=/tmp/mytpm1 \
    --ctrl type=unixio,path=/tmp/mytpm1/swtpm-sock \
    --tpm2 \
    --log level=20 &
exec qemu-system-x86_64 \
	-enable-kvm \
	-cpu 'host,kvm=off,hv_vendor_id=null,hypervisor=off' \
	-machine 'type=q35,smm=on,kernel_irqchip=on' \
    -uuid <uuid-obtained-earlier> \
	-m 4G \
	-drive file=/home/joash/VMs/virtio-win-0.1.229.iso,media=cdrom \
	-drive file=/home/joash/VMs/Win11_22H2_English_x64v2.iso,media=cdrom \
	-drive file=/dev/vgmain/lvolwindows,if=virtio \
	-drive if=pflash,format=raw,readonly=on,file=/usr/share/edk2-ovmf/OVMF_CODE.secboot.fd \
  -chardev socket,id=chrtpm,path=/tmp/mytpm1/swtpm-sock \
  -tpmdev emulator,id=tpm0,chardev=chrtpm \
  -device tpm-tis,tpmdev=tpm0 \
	-monitor stdio \
	-net nic \
	-net user,hostname=windowsvm \
	-name "Windows11" \
	-vga virtio \
	"$@"
```


## VM Networking {#vm-networking}

Now let us consider networking possibilities with VMs. Ideally, we would traffic to and from our VMs to be isolated from the host machine and each other. Furthermore, we would like our VMs to have their own dedicated IP addresses. In this way our VMs networking will truly behave as if they were separate machines.

For networking with physical machines we introduce a **switch** which is a layer 2 device that transfers data to the network with MAC addresses. Since our VMs do not exist as separate physical hardware, we will need to emulate the switch. The **iproute2** userspace program introduces the concept of a **bridge** which is analogous to a physical switch.

```bash
BRIDGE="br10"
SUBNET_PREFIX="10.10.20"
HOST_IF_MAC="aa:bb:cc:dd:ee:ff" # get this by running ip link show wlp3s0

ip link add name "$BRIDGE" type bridge
ip addr add "$SUBNET_PREFIX".1/24 dev "$BRIDGE"
ip link set dev "$BRIDGE" address "$HOST_IF_MAC" # Spoof the MAC address to be the same as wireless interface
```

We will also emulate the network interfaces connected to the VMs through the use of a **tap** device. Once the tap devices have been created and connect them to the bridge.

```bash
BRIDGE="br10"
UBUNTUVM_TAP="tap1"

ip tuntap add dev "$UBUNTUVM_TAP" mode tap
ip link set dev "$UBUNTUVM_TAP" master "$BRIDGE"

ip link set "$BRIDGE" up
ip link set "$UBUNTUVM_TAP" up
```

A **DHCP** server is required to assign IP addresses to the VMs. **dnsmasq** allows us to run a lightweight DHCP server on our host machine. We will bind the DHCP server to the bridge interface created earlier. dnsmasq is configured through a /etc/dnsmasq.conf file as follows.

```bash
# /etc/dnsmasq.conf

interface=br10
bind-interfaces
dhcp-range=10.10.20.1,10.10.20.254,12h # range of IP addresses to give out for a lease of 12 hours
```

Although the VMs are now connected on their own virtual sub-network, we still need to provide internet access to them. If your host is connected to the internet through an Ethernet cable this is easy. Simply add the Ethernet interface to the bridge network and change the default ip route to go through the bridge interface. See below:

```bash
ip route default dev br10
```

If your host machine is connected to the internet through a wireless interface (i.e. WiFi), then we have to address the following challenges ahead. First we cannot simply assign the wireless interface to the bridge network as we did with the tap devices. This is not supported. Instead we will use IP tables to MASQUERADE all traffic from the bridge as though they are originating from the wireless interface itself. Keep in mind iptables is a layer 3 firewall. Be sure to also include rules to allow traffic between you and your DHCP server setup earlier.

```bash
NETIF="wlp3s0" # wireless interface
BRIDGE="br10"
SUBNET="10.10.20.0/24"

iptables -A INPUT -i "$BRIDGE" -p udp -m udp --dport 53 -j ACCEPT
iptables -A INPUT -i "$BRIDGE" -p tcp -m tcp --dport 53 -j ACCEPT

iptables -A INPUT -i "$BRIDGE" -p udp -m udp --dport 67 -j ACCEPT
iptables -A INPUT -i "$BRIDGE" -p tcp -m tcp --dport 67 -j ACCEPT

# masquerade traffic on the VMs within subnet though it originated from the bridge interface
iptables -t nat -A POSTROUTING -s "$SUBNET" -o "$NETIF" -j MASQUERADE
```

The resulting script to start the VM with QEMU will then be the following:

```bash
#!/bin/bash
exec qemu-system-x86_64 -enable-kvm \
	-cpu host \
	-smp cores=4 \
	-bios /usr/share/edk2-ovmf/OVMF_CODE.fd \
	-drive file=/dev/vgmain/lvolubuntu,if=virtio \
	-netdev tap,id=mynet0,ifname=tap1,script=no,downscript=no \
	-device virtio-net,netdev=mynet0 \
	-m 4G \
	-name "Ubuntu22" \
	-vga virtio \
    "$@ "
```


## Wireguard VPN access {#wireguard-vpn-access}

In a previous section, we created a sub-network for the VMs with their own dedicated IP addresses on that subnet. Furthermore, we created routing rules for devices on the main home network to find VMs on the subnet. Now let us consider accessing a VM from a network outside our home network. Ideally, we should be anywhere in the world and be able to access the VMs. To achieve this, we will create our own Virtual Private Network (VPN) server. This will allow pre-authorized devices to "tunnel" into the VPN network from anywhere in the world, obtain an IP address as if they were directly connected to this VPN network and hence get access to all resources on the VPN network.

```bash
ip link add dev wg0 type wireguard
ip addr add 10.10.20.0/24 dev wg0


ip link set wg0 up
```

Of course we must also update our firewall rules to allow traffic over the Wireguard VPN network.

```bash
iptables -I INPUT -p udp --dport 51820 -j ACCEPT
iptables -A INPUT -i wg0 -m state --state ESTABLISHED,RELATED -j ACCEPT
```


## References {#references}

-   [Red Hat Modifying the size of a logical volume](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_logical_volumes/modifying-the-size-of-a-logical-volume_configuring-and-managing-logical-volumes)
-   [Red Hat Developer: Introduction to Linux interfaces for virtual networking](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking#bridge)
-   [Kernel VFIO](https://www.kernel.org/doc/html/latest/driver-api/vfio.html)
-   [Gentoo Wiki GPU passthrough with libvirt qemu kvm](https://wiki.gentoo.org/wiki/GPU_passthrough_with_libvirt_qemu_kvm)
-   [PCI_passthrough_via_OVMF](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF)
-   [gpu-passthrough](https://clayfreeman.github.io/gpu-passthrough/)
-   [Fighting error 43 NVIDIA GPU in Virtual Machine](https://mathiashueber.com/fighting-error-43-nvidia-gpu-virtual-machine/)

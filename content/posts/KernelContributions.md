+++
title = "My first Linux kernel contribution"
author = ["Joash Naidoo"]
date = 2022-09-17T00:00:00+02:00
tags = ["Linux", "kernel", "open-source", "Git"]
draft = false
+++

I got interested in Linux in high school when I stumbled upon it as side note in a textbook. It was only in the following couple years did I realize the importance Linux had in the computer and programming community. Linux only refers to the operating system's kernel which is an abstraction that provides a unified platform for software to run on many different types of hardware. The kernel is open source software and anyone can contribute to its development. So after years of benefiting from the contributions of others I decided I would investigate the development process that makes it all possible.

<!--more-->


## Obtain Source Tree {#obtain-source-tree}

There are many different kernel trees to work off of. It is important to use the same one as the maintainers of the subsystem in which your changes are made. The drivers/staging subsystem is a recommended place to start contributing and is handled by Greg KH. A list of the maintainers' trees are available [here](https://git.kernel.org).

```bash
git clone https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git
git checkout staging-testing
```


## Project Structure {#project-structure}

To get started with simple contributions we are only interested in the following two directories with the kernel source tree.

-   scripts folder has useful tools for development. Specifically the checkpatch.pl checks for correct coding style
-   drivers/staging is a good place to start kernel. Modules here contain a TODO file which helps give direction on what to do and importantly are open to simple coding style fixes.


## Janitorial Work {#janitorial-work}


### Coding style {#coding-style}

For simple coding style fixes, run the following command.

```bash
./scripts/checkpatch --file --terse drivers/staging/<driver>/*.c
```


### Sparse testing {#sparse-testing}

Sparse: tool for static code analysis to help detect errors

```bash
make C=2 drivers/staging/<driver>/ # the C=2 option invokes sparse
```


## Making changes and testing {#making-changes-and-testing}

1.  Create and checkout new branch
2.  Make edits
3.  Build the kernel module with edits
    ```bash
    make M=drivers/staging/<driver> clean
    make M=drivers/staging/<driver>
    ```

4.  If the module builds, it is worth booting the custom kernel to test it out on hardware. This process differs depending on the distribution you are using. Here I will briefly outline how I did it with the Gentoo distribution
    ```bash
    make menuconfig # enable driver as module
    make -j7 # build
    sudo make modules_install
    sudo make install # ensure /boot directory is mounted first
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    ```
5.  Use dmesg tool for reading kernel messages
    ```bash
    dmesg -l crit
    dmesg -l err
    dmesg -l warn
    ```


## Building a patch/patchset {#building-a-patch-patchset}

The are strict [rules](https://kernelnewbies.org/PatchPhilosophy) to submitting patches. One of these rules dictates a single patch should only be do one thing. Patches relate to commits. If you are making a single change you'll have one commit and hence submit one patch. If you are submitting many changes you'll have many commits and submit a patchset (i.e. a collection of numbered patches).

1.  Git status gives summary of files modified
2.  Git diff shows files modified in patch format
    ```bash
    git diff

    git commit -v # only staged changes will be commited. ensure a single commit only achieves a single task
    ```
3.  Commit message should be as follows. Ensure you included signed off line.
    ```markdown
        Staging: r8188eu: Fix too many leading tabs line length

        Fix coding style issue. Too many leading tabs

        Signed off by: Joash Naidoo <joash.n09@gmail.com>
    ```
4.  Create patch

    -   Must run the following from the root of the kernel source tree

    <!--listend-->

    ```bash
    git show --pretty=full

    # if single patch
    git format-patch <maintainers-branch>..<my-branch>

    # if patchset
    git format-patch -n --cover-letter <maintainers-branch>..<my-branch>
    ```

    -   If resubmitting patches, the --subject-prefix option must be passed (see below)
    -   For patchsets, remember to change cover letter subject line and contents. Contents are an overview of what the following patches fixes. Cover letter is discarded after patchset applied so ensure current information is found within the individual patch commits
    -   Format patch produces patch files. Use -o option to specify output directory

5.  Ensure patch passes checkpatch.el script
    ```bash
    ./scripts/checkpatch.pl <patch-file>
    ```


## Setup email (Gmail) with Git {#setup-email--gmail--with-git}

1.  Enable 2 factor authentication on Gmail
2.  Create "App Password"
3.  Add the following to you .gitconfig
    ```bash
    [sendemail]
            smtpserver = smtp.googlemail.com
            smtpencryption = tls
            smtpserverport = 587
            smtpuser = <your-email@gmail.com>
    ```
4.  Find list of maintainers to send to
    ```bash
    ./scripts/get_maintainer.pl 0001-<patch>
    ```
5.  Send email
    ```bash
    git send-email --to=<> --cc=<> 0001-<patch>
    ```
6.  You will be prompted for password. Use your "App password" you created earlier.


## Replying to emails {#replying-to-emails}

-   Do NOT use Gmail's web based email client. [Recommended clients](https://www.kernel.org/doc/html/v4.10/process/email-clients.html)
-   You need to use an email client that supports replying inline
-   Some options include MUTT (a terminal based email client) and mu4e (what I personally used)
-   Reply to everyone in the list


## Fix patch if you messed up {#fix-patch-if-you-messed-up}

1.  First stage changes you were requested to make
2.  Amend commit. Assuming you want to create a patch out of the latest commit, run the following:
    ```bash
    git commit --verbose --amend
    ```
3.  Create new patch
    ```bash
    git format-patch --subject-prefix="PATCH v2" HEAD^
    ./scripts/checkpatch.pl <new_patch_file>
    ```
4.  When you're ready send email


## Bibliography {#bibliography}

1.  [Write and Submit your first Linux kernel Patch (video)](https://www.youtube.com/watch?v=LLBrBBImJt4)
2.  [KernelNewbies First Kernel Patch](https://kernelnewbies.org/FirstKernelPatch)

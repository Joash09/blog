---
author:
- Joash Naidoo
date: "2025-08-01T00:00:00+02:00"
draft: false
title: Embedded Linux Development Board
---

## Demo

{{< youtube _jHT4Ac2Yag >}}

## Overview

The motivation for this project was to create from scratch a complete embedded linux development platform for learning and experimentation.

Building a development board from scratch is not trivial. Going through the process myself highlighted the following key considerations:
- Stackup layout in order to minimize Electromagnetic Interference (EMI) and ground loop effects
- Power management considerations: Modern ICs may require different power supply input voltages which need to be brought up in a specific order for correct operation
- Trace clearance recommendations must be adhered to to avoid EMI interfernce
- Trace impedences to match application specifications (e.g. USB2.0 requires 45 $$\Omega$$ differential impedence)
- Delay matching - high speed applications require signals to arrive within a certain tolerance to avoid data corruption
- Passive component selection is more than simply selecting the nominal value. One must consider real world performance. For example capacitors operating with a forward DC bias sees a decrease in overall capacitance.
- Availability of components must be checked to ensure they still supported and can be procured easily

The key features of the board I designed and manufactured include:

- Microchip SAM9X60 ARM926EJ-S based MPU running at 600MHz
- 64MB DDR2-800 SDRAM
- mirco SD card with ESD protection
- 100Mbit Ethernet
- 2 USB Type A ports with over-current and ESD protection
- Support for a 24 bit parallel LCD touch display (specifically targeting the Newhaven's NHD-4.3-800480CF-ASXP-CTP)
- ARM EmbeddedICE JTAG debug interface

## Design screenshots

![Front](/linux_dev_board/FrontCombined.jpg)
![Back](/linux_dev_board/BackCombined.jpg)
![Schematic](/linux_dev_board/Schematic.jpg)
![PCBRouting](/linux_dev_board/PCB_Routing.jpg)

## Software Design

On the software side, the board runs a custom embedded Linux distribution I built using the Yocto project. Main components of the distribution include the AT91Bootstrap bootloader, u-boot acting as the third stage bootloader, Linux kernel, custom devicetree, systemd init system, busybox utilities and the Atom package manager.

## Device Tree

![DeviceTree](/linux_dev_board/DeviceTree.drawio.svg)

## Yocto project layers

```
layer                 path                                                                    priority
========================================================================================================
core                  /home/joash/strawberry_os/poky/meta                                     5
yocto                 /home/joash/strawberry_os/poky/meta-poky                                5
yoctobsp              /home/joash/strawberry_os/poky/meta-yocto-bsp                           5
openembedded-layer    /home/joash/strawberry_os/poky/../meta-openembedded/meta-oe             5
networking-layer      /home/joash/strawberry_os/poky/../meta-openembedded/meta-networking     5
webserver             /home/joash/strawberry_os/poky/../meta-openembedded/meta-webserver      5
meta-python           /home/joash/strawberry_os/poky/../meta-openembedded/meta-python         5
meta-initramfs        /home/joash/strawberry_os/poky/../meta-openembedded/meta-initramfs      5
atmel                 /home/joash/strawberry_os/poky/../meta-atmel                            10
multimedia-layer      /home/joash/strawberry_os/poky/../meta-openembedded/meta-multimedia     5
meta-arm              /home/joash/strawberry_os/poky/../meta-arm/meta-arm                     5
arm-toolchain         /home/joash/strawberry_os/poky/../meta-arm/meta-arm-toolchain           5
meta-strawberry_sam   /home/joash/strawberry_os/meta-strawberry_sam                           6
```

## Custom layer file structure

```
meta-strawberry_sam/
├── COPYING.MIT
├── README
├── conf
│   ├── layer.conf
│   └── machine
│       ├── include
│       │   ├── at91sam9.inc
│       │   ├── bootloaders.inc
│       │   └── sam9x60.inc
│       └── sam9x60custom.conf
├── recipes-bsp
│   ├── at91bootstrap
│   │   ├── at91bootstrap_%.bbappend
│   │   └── files
│   │       ├── defconfig
│   │       └── sam9x60custom_linux_dt_defconfig
│   └── u-boot
│       ├── files
│       │   ├── envs
│       │   │   └── sam9x60custom.txt
│       │   ├── sam9x60custom_defconfig
│       │   └── strawberry_sam.dts
│       └── u-boot-mchp_2024.07.bbappend
├── recipes-example
│   └── example
│       └── example_0.1.bb
└── recipes-kernel
    └── linux
        ├── files
        │   ├── at91-strawberry_sam.dts
        │   ├── newhaven-43-800480-timings.patch
        │   └── sam9x60custom_config.patch
        ├── linux-mchp_%.bbappend
        └── temp.txt
```

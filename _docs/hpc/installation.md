---
layout: docs/doc-page
title: Installing HPC Extensions
description: How to add Slurm assist and NBTerm to Sandstone IDE
---

## HPC Extensions

There are currently two HPC extensions for Sandstone IDE:

* **Slurm Assist** [(github)](/SandstoneHPC/sandstone-slurm-assist) - An intuitive, descriptive app that provides a visual method for scheduling jobs with Slurm.
* **NBTerm** [(github)](https://github.com/SandstoneHPC/sandstone-nb-term) - A web terminal, with a Jupyter/BASH notebook integration for delivering interactive documentation to users.

Each of these extensions, or apps, are just python modules that are imported by Sandstone IDE during startup if they are declared in the `INSTALLED_APPS` [setting](/docs/core/settings/#available-settings). This means that Sandstone IDE must first be installed, and in the same Python environment as the apps you wish to add.

### Installing Slurm Assist

Clone Slurm Assist and navigate to the module directory:

```
git clone https://github.com/SandstoneHPC/sandstone-slurm-assist.git
cd sandstone-slurm-assist/sandstone_slurm
```

Build the dependencies for the front-end components:

```
bower install
```

Lastly, navigate to the repository root and install the python package (a virtualenv is recommended):

```
cd ..
python setup.py install
```

Now, add `'sandstone_slurm'` to the `INSTALLED_APPS` settings tuple in your `sandstone_settings.py` file. [Settings Documentation](/docs/core/settings/#available-settings).

```
INSTALLED_APPS = (
  # Default apps
  'sandstone_slurm',
)
```

For documentation on how to configure Slurm Assist for your site, read about [configuring Slurm Assist](/docs/hpc/configuring-slurm-assist/).

### Installing NBTerm

Clone NBTerm and navigate to the module directory:

```
git clone https://github.com/SandstoneHPC/sandstone-nb-term.git
cd sandstone-nb-term/sandstone_nbterm
```

Build the dependencies for the front-end components:

```
bower install
```

Lastly, navigate to the repository root and install the python package (a virtualenv is recommended):

```
cd ..
python setup.py install
```

Now, add `'sandstone_nbterm'` to the `INSTALLED_APPS` settings tuple in your `sandstone_settings.py` file. [Settings Documentation](/docs/core/settings/#available-settings).

```
INSTALLED_APPS = (
  # Default apps
  'sandstone_nbterm',
)
```

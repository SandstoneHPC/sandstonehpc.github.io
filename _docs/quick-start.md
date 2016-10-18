---
layout: docs/doc-page
permalink: /docs/
title: Quick Start Guide
description: Install Sandstone IDE in minutes.
---

###Install Via Pip
To install Sandstone IDE using PIP, run:
```
pip install sandstone
```
###Install From Source
To install Sandstone IDE, first clone the repository and enter the project directory:
```
git clone https://github.com/SandstoneHPC/sandstone-ide.git
cd sandstone-ide
```
Then, build the dependencies for the front-end components:
```
cd sandstone/client
npm install
```
Switch back to the project root and install the python package (a virtualenv is recommended):
```
python setup.py install
```
###Run Sandstone IDE
Sandstone IDE can now be run with the following command:
```
sandstone
```
To use Sandstone IDE, point your browser to `localhost:8888`. For documentation on how to configure Sandstone to run over SSL or on a different port, read about [configuring Sandstone settings](/docs/core/settings.html).

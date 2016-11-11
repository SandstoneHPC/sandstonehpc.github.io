---
layout: docs/doc-page
disqus_id: core-settings
title: Configuring Sandstone IDE
description: Customize your installation
---

### Overview
This section details how to change the default configuration of Sandstone IDE, and which settings are available for use.

### Environment Variables
Sandstone IDE will read from the following environment variables _(if set)_ during startup.

`SANDSTONE_PORT`
_Default: '8888'_

The port on which Sandstone IDE will listen.

`SANDSTONE_SETTINGS`

The Python file from which custom configuration will be read. Value must be an absolute path. If this value is unset, Sandstone IDE will run with default settings.

### Settings File
When Sandstone IDE starts up, it will attempt to load custom settings from any Python file specified by the `SANDSTONE_SETTINGS` environment variable. This file is loaded as a normal Python module, so settings can be dynamically defined using normal Python syntax, and values can be imported from other Python files.

Any module-level variable with an **uppercase** name will be loaded as a setting, and will be made available across Sandstone IDE and any installed apps. Any settings defined in this file will override default values, if they exist.

### Available settings

`COOKIE_SECRET`
_Default: `'YouShouldProbablyChangeThisValueForYourProject'`_

Assign this to something secret. Must be a string.

`USE_SSL`
_Default: `False`_

When set to `True`, Sandstone IDE will serve over SSL. `SSL_KEY` and `SSL_CERT` must also be defined if this setting is true.

`SSL_KEY`
_Default: `None`_

The absolute filepath, as a string, of the SSL certificate Sandstone will use. Must be defined if `USE_SSL` is set to True.

`SSL_CERT`
_Default: `None`_

The absolute filepath, as a string, of the SSL key Sandstone will use. Must be defined if `USE_SSL` is set to True.

`INSTALLED_APPS`
_Default:_

```python
(
    'sandstone.lib', #Sandstone won't work without this one!
    'sandstone.apps.codeeditor',
    'sandstone.apps.filebrowser',
    'sandstone.apps.webterminal'
)
```

A tuple to declare which apps should be loaded when Sandstone starts up. Each app must be defined as a string, and represent a valid Python module.

`FILESYSTEM_ROOT_DIRECTORIES`
_Default:_

```python
(
    os.path.join('$HOME', ''),
    '/tmp/',
)
```

A tuple that defines the highest navigable directories for the filetree and _Filebrowser_ app. Each entry must resolve to a string. The roots defined here may optionally use available UNIX environment variables, which will be expanded during startup. For example, `/$PWD/` will add the current working directory as a filesystem root.

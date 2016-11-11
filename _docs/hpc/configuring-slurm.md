---
layout: docs/doc-page
disqus_id: hpc-configuring-slurm
title: Configuring Slurm Assist
description: How to configure the schedule form to work with your Slurm installation
---

## Overview
The schedule form in Slurm Assist is built to be highly-configurable, and accommodate nearly any Slurm setup. This is accomplished by representing Sbatch options with an extended interpretation of [JSON Schema v4](http://json-schema.org/latest/json-schema-core.html). This schema is used to dynamically define and validate the sbatch options exposed to the user.

## Base Schema
The _Base Schema_ is the core JSON schema in Slurm Assist, and it contains all the configuration necessary to represent and validate the [Slurm Sbatch options](http://slurm.schedmd.com/sbatch.html). Any custom properties you define will draw their initial attributes from the Base Schema, however the Base Schema is not intended to be directly modified. Alterations should instead be made by overriding schema properties in your [`FORM_CONFIG`](#form-config). Below is an abbreviated example of what the Base Schema looks like:

```python
BASE_CONFIG = {
        "type": "object",
        "title": "SlurmConfig",
        "properties": {
            "account": {
                'title': "account",
                "type":"string",
                "enum": user_accounts,
                'description': 'Charge resources used by this job to specified account...',
            },
            "time": {
                      "title": "time",
                      "type": "string",
                      "subtype": "duration",
                      "pattern": '^(\d+-)?(\d+):(\d+):(\d+)$',
                      "minDuration": 0,
                      'description': 'Set a limit on the total run time of the job allocation. If the requested time limit exceeds the partition\'s time limit...',
                  },
            # ...
        }
}
```

The complete Base Schema can be found in the Slurm Assist [settings file](https://github.com/SandstoneHPC/sandstone-slurm-assist/blob/master/sandstone_slurm/settings.py).

## Extensions to JSON Schema v4
Slurm Assist adds the concept of _subtypes_ to JSON Schema, which supplements the existing [type options](http://json-schema.org/latest/json-schema-core.html#anchor8) to provide richer form content. Each subtype is added to a primitive type to extend the capabilities of that property. Below is a listing of supported subtypes:

### duration
Slurm accepts many different formats when specifying time and duration, which makes validating time strings via regex impractical. To resolve this, the _duration_ subtype was added to extend the _string_ primitive type. This subtype treats a duration as an **optionally** bounded integer representing CPU minutes.

**Supported Time Formats**
The following are time formats supported by the duration subtype. These options can be further restricted as usual with the `pattern` attribute.

* DD-HH:MM:SS
* HH:MM:SS
* MM:SS
* MM

**Extended attributes**

* `subtype: duration` _(required)_
* `minDuration: <value>` _(optional)_ The minimum valid duration, where _value_ is an integer representing CPU minutes.
* `maxDuration: <value>` _(optional)_ The maximum valid duration, where _value_ is an integer representing CPU minutes.

### filepath
The _filepath_ subtype extends the _string_ primitive type, and allows file paths to be selected with a filetree input instead of the user needing to manually specify a filepath.

**Extended Attributes**

* `subtype: filepath` _(required)_
* `dironly: <boolean>` _(optional) Default: False_ If set to True, only directories can be selected for the input.

## Configuring the Schedule Form
The following section will guide you through configuring the schedule form to work with your local Slurm installation.

### Form Config
Start by adding the `FORM_CONFIG` setting to your local [Sandstone settings file](/docs/core/settings/). The basic structure of the _Form Config_ settings is as follows:

```python
FORM_CONFIG = {
    # [<str: feature1>, <str: feature2>]
    'features': [],
    # [(<str: gname>, <str: type>, <int (optional): count>), ...]
    'gres': [],
    # Site-specific queue config
    'profiles': {
      # '<profile-name>': {
      #     initial: [<str (optional): initial_prop1, ...],
      #     schema: {
      #         prop1: {
      #             <Your prop attribute overrides here>
      #         }
      #     }
      # }, ...
      }
    }
```

#### features
_Under development._

#### gres
_Under development._

#### profiles
This is a dictionary mapping short, descriptive names to a particular set of configuration overrides and defaults. The keys in the `profiles` dictionary will populate the _Select Profile_ field presented to the user at the top of the schedule form.

### Configuring a profile
The following section will explain how to create a custom profile to add to your `FORM_CONFIG`.

#### Overriding Properties
Properties set in the `properties` dictionary of a profile's `schema` can be partially, or completely modified. Any attribute declared in a property's definition will be used to patch that property's definition for the specified profile only. Unaltered properties will be populated using Base Schema only. An [example configuration](#example-profile) can be found below.

#### Initial Properties
Properties declared in a profile's `initial` list will be automatically added to the schedule form when a user selects that profile. The user will be able to remove the field. Any default values configured for the property will be used to populate the form field, if the form field has no current value.

#### Required Properties
Properties declared in the `required` list of a profile's `schema` dictionary will be automatically added to the schedule form when a user selects that profile. **The user will not be able to remove the field.** Any default values configured for the property will be used to populate the form field, if the form field has no current value.

#### Default Values
If a property contains the `default` attribute, the specified value will be used to populate the associated form field when it is added to the schedule form. This value will not overwrite existing form data, unless `readonly` is set to `True`.

#### Read-Only Properties
If the `readonly` attribute of a property is set to `True`, the user will not be able to modify the value of the associated form field. When the user switches profiles, the `default` value of a `readonly` property will **overwrite existing form data**.

#### Example Profile
Below is an example profile configuration:

```python
FORM_CONFIG = {
    # ...
    'profiles': {
    'janus-debug': {
            # Form is prepopulated with these fields (can be empty)
            'initial': [
                'time',
            ],
            # Schema specified here will be used to patch base schema (can be empty)
            'schema': {
                "properties": {
                    "qos": {
                        "readonly": True,
                        "default": "janus-debug",
                    },
                    "partition": {
                        "readonly": True,
                    },
                    "cluster": {
                        "readonly": True,
                    },
                    "nodes": {
                        "default": 1,
                    },
                    "time": {
                        "subtype": "duration",
                        "pattern": '^(\d+-)?(\d+):(\d+):(\d+)$',
                        "default": "00:30:00",
                        "maxDuration": 60,
                        # IMPORTANT: The description attribute is used to populate the help text
                        # for the associated form field.
                        "description": "Custom help text for this property."
                    },
                },
                # Form must contain these fields (can be empty)
                'required': [
                    'qos',
                    'nodes',
                ]
            }
        },
        # ...
    }
}
```

A more complete example configuration can be found in [sandstone-config](https://github.com/ResearchComputing/sandstone-config/blob/master/sandstone_settings.py).

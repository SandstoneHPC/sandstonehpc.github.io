---
layout: docs/doc-page
title: Configuring Slurm Assist
description: How to configure the schedule form to work with your Slurm installation
---

## Configuring the Schedule Form
The schedule form in Slurm Assist is built to be highly-configurable, and accommodate nearly any Slurm setup. This is accomplished by representing Sbatch options with an extended interpretation of [JSON Schema v4](http://json-schema.org/latest/json-schema-core.html). This schema is used to dynamically define and validate the sbatch options exposed to the user.

### Base Schema

### Extensions to JSON Schema v4
Slurm Assist adds the concept of _subtypes_ to JSON Schema, which supplements the existing [type options](http://json-schema.org/latest/json-schema-core.html#anchor8) to provide richer form content. Each subtype is added to a primitive type to extend the capabilities of that property. Below is a listing of supported subtypes:

#### duration
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

#### filepath
The _filepath_ subtype extends the _string_ primitive type, and allows file paths to be selected with a filetree input instead of the user needing to manually specify a filepath.

**Extended Attributes**

* `subtype: filepath` _(required)_
* `dironly: <boolean>` _(optional) Default: False_ If set to True, only directories can be selected for the input.

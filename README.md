### Install From Source
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

For OSX users that don't have ```npm``` installed please make sure to have homebrew installed first.  After installing homebrew, you can then install the Node Package Manager (NPM) 
with the following homebrew command

```
brew install npm
```

Switch back to the project root and install the python package (a virtualenv is recommended):

```
python setup.py install
```

### Run Sandstone IDE
Sandstone IDE can now be run with the following command:

```
sandstone
```

To use Sandstone IDE, point your browser to `localhost:8888`. For documentation on how to configure Sandstone to run over SSL or on a different port, read about [configuring Sandsto
ne settings](/docs/core/settings/).

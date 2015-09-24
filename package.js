Package.describe({
  name: 'frpz:net-snmp',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Meteor smart package for net-snmp node.js package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/frpz/net-snmp',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "net-snmp": "1.1.14"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  //api.use('ecmascript');
  api.addFiles('net-snmp.js', ["server"]);
  api.export('snmp');
});

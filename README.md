frpz:net-snmp
=============

Meteor smart package for net-snmp [node.js](https://www.npmjs.com/package/net-snmp) package

# Install

Just add the package:

    meteor add frpz:net-snmp

For more informations, see [documentation](https://www.npmjs.com/package/net-snmp)

# Usage

You can access the `snmp` variable **on the server side only**

# Example

On server side:

```javascript
Meteor.methods({
	getArpTable: function(target){

		var community = "public";
		var version = ("2c" == "2c") ? snmp.Version2c : snmp.Version1;

		var oid = "1.3.6.1.2.1.17.4.3.1.2";

		var session = snmp.createSession (target, community, {version: version});

		var oidToMac = function(oid){
			return oid.split(".").slice(-6).map(function(v){ return ("0"+Number(v).toString(16)).slice(-2).toUpperCase();  }).join(':');
		}

		var maxRepetitions = 40;

		var getTab = function (oid, callback){
			session.subtree(oid, maxRepetitions, function(varbinds){
				for (var i = 0; i < varbinds.length; i++) {
					if (snmp.isVarbindError (varbinds[i]))
						varbinds[i].error = snmp.varbindError (varbinds[i]);
						else{
							varbinds[i].realType = snmp.ObjectType[varbinds[i].type]
							varbinds[i].macAddress = oidToMac(varbinds[i].oid);
						}
				}
				callback(null, {error: false, arptable: varbinds});
			}, function(error){
				if(error) callback(null, {error: error.toString()});
			});
		}

		var getTabSync = Meteor.wrapAsync(getTab);
		var tab = getTabSync(oid);
		console.log("async: ", JSON.stringify(tab));
		return tab;
	}
});

```


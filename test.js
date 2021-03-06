var ISY = require('./isy');
var ISYDevice = require('./isydevice');

function handleInitialized() {
	var deviceList = isy.getDeviceList();
	if(deviceList == null) {
		ISY.debugLog("No device list returned!");
	} else {
		ISY.debugLog("Got device list. Device count: "+deviceList.length);
		for(var index = 0; index < deviceList.length; index++ ) {
			ISY.debugLog("Device: "+deviceList[index].name+", "+deviceList[index].deviceType+", "+deviceList[index].address+", "+deviceList[index].deviceFriendlyName);
		}
	}
}

function handleChanged(isy, device) {
	var logMessage = 'From isy: '+isy.address+' device changed: '+device.name;
	if(device.deviceType == isy.DEVICE_TYPE_FAN) {
		logMessage += ' fan state: '+device.getCurrentFanState();
	} else if(device.deviceType == isy.DEVICE_TYPE_LIGHT) {
		logMessage += ' light state: '+device.getCurrentLightState();
	} else if(device.deviceType == isy.DEVICE_TYPE_DIMMABLE_LIGHT) {
		logMessage += ' dimmable light state: '+device.getCurrentLightState()+' dimm Level: '+device.getCurrentLightDimState();
	} else if(device.deviceType == isy.DEVICE_TYPE_LOCK || device.deviceType == isy.DEVICE_TYPE_SECURE_LOCK) {
		logMessage += ' lock state: '+device.getCurrentLockState();
	} else if(device.deviceType == isy.DEVICE_TYPE_OUTLET) {
		logMessage += ' outlet state: '+device.getCurrentOutletState();
	} else if(device.deviceType == isy.DEVICE_TYPE_ALARM_DOOR_WINDOW_SENSOR) {
		logMessage += ' door window sensor state: '+device.getCurrentDoorWindowState()+' logical: '+device.getLogicalState()+' physical: '+device.getPhysicalState();		
	} else if(device.deviceType == isy.DEVICE_TYPE_DOOR_WINDOW_SENSOR) {
		logMessage += ' door window sensor state: '+device.getCurrentDoorWindowState();
	} else if(device.deviceType == isy.DEVICE_TYPE_ALARM_PANEL) {
		logMessage += ' alarm panel state: '+device.getAlarmStatusAsText();
	} else if(device.deviceType == isy.DEVICE_TYPE_MOTION_SENSOR) {
		logMessage += ' motion sensor state: '+device.getCurrentMotionSensorState();        
	} else {
		logMessage += ' unknown device, cannot parse state';
	}
	
    ISY.debugLog(logMessage);
}

var isy = new ISY.ISY('10.0.1.19', 'admin', 'ErgoFlat91', true, handleChanged);
var devices = isy.initialize(handleInitialized);



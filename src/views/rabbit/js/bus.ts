import mitt from 'mitt';

interface bugInter {
	'$on':any,
	'$off':any,
	'$emit':any
}

const bus:bugInter = {
	$on:null,
	$off:null,
	$emit:null
};

const emitter = mitt();

bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus;
/**
 * 
 */
import {getContextPath} from '../common.js';

document.getElementById("skin-pang").addEventListener('click', function(){
	location.href = getContextPath() + '/skinPang.game';
})
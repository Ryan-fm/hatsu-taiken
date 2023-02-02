import {defineStore} from 'pinia'

const defaulState = {
	scene:'press'
}
export const useSystemStore = defineStore('system',{
	state:()=>{
		return{
			...defaulState
		}
		
	},
	actions:{
		changeScene(seceneName){
			this.scene = seceneName
		}
	}
})
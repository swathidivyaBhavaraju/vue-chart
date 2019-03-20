<template>
  <div class="app">
    <input 
      id="fileInput"
      type="file"
      @change="upload">
  <div v-if='resultJson.length'>
  <line-chart :result-data ="resultJson"></line-chart>
  </div>
</div>
</template>

<script>
  import LineChart from './LineChart.js'
  import Papa from 'papaparse'

  export default {
    components: {
      LineChart
    },
    data(){
      return {
        resultJson: []
      }
    },
    methods:{
    upload (e) {
        const that = this
        const fileToLoad = event.target.files[0]
        const reader = new FileReader()
        reader.onload = fileLoadedEvent => {
          Papa.parse(fileLoadedEvent.target.result, {
            complete (results) {
              if(results.error){
                console.log(error);
              }
              else if(results.data){
                that.resultJson = results.data;
                
              }
            },
            error (errors) {
              console.log('error', errors)
            }
          })
        }
        reader.readAsText(fileToLoad)
      }
    }
  }
</script>

<style>
  #fileInput{
    padding: 10px 0px;
    font-size: 16px;
  }
</style>
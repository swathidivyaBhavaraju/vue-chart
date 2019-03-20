import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['resultData'],
  data: () => ({
     datacollection: {
       labels:['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003'],
       datasets:[]
     },
    colors: [],
    options:{

    }
  }),
  mounted () {
    this.colors = this.getColors();

    this.manipulateData();
    this.displayLineChart();
  },
  methods: {
    displayLineChart(){
      this.renderChart(this.datacollection, 
      {responsive: true, maintainAspectRatio: false})
    },
    manipulateData(){
      this.resultData.forEach((element,i) => {
            let obj= {
              label:element[0],
              backgroundColor:this.colors[i],
              data:new Array(this.datacollection.labels.length)
            };
            element.shift();
            element.forEach((field) => {
              let fieldsArr = field.split("|");
              let index = this.datacollection.labels.indexOf(fieldsArr[0]);
              if(index>-1 ){
                obj.data[index]=fieldsArr[1];
              }
            });
            obj.data = Array.from(obj.data, item => item ? item : "0");
            this.datacollection.datasets.push(obj);            
      });
    },
    getColors(){
      let gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      let gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      let gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      let gradient4 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
      gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
      gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

      gradient4.addColorStop(0, 'rgba(239, 250, 30, 0.5)')
      gradient4.addColorStop(0.5, 'rgba(239, 250, 30, 0.25)');
      gradient4.addColorStop(1, 'rgba(239, 250, 30, 0)');

      gradient3.addColorStop(0, 'rgba(18, 242, 17, 0.5)')
      gradient3.addColorStop(0.5, 'rgba(18, 242, 17, 0.25)');
      gradient3.addColorStop(1, 'rgba(18, 242, 17, 0)');
    
      return [ gradient,gradient2,gradient3,gradient4]; 
    }
  },
}

import { LightningElement,api,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import obtenerPersonaje from '@salesforce/apex/FormularioController.obtenerPersonaje';
import saveContact from '@salesforce/apex/FormularioController.saveContact';
export default class HelloWorld extends LightningElement {
  
  disabled=true; //field disabled
  @track datos=[]; //usar en distintos metodos
  @track disabledSave=true;
  @track disabledPlaneta=true;
  @track disableAltura=true;
  @track disabledCabello=true;
  @track disabledOjos=true;
  @track disabledGenero=true;
  @track disabledURL=true;
  @track disabledPlaneta=true;
  @track name
  dataAltura;


    validaciones(){
      if (this.datos.Planeta__c==="n/a"||this.datos.Planeta__c=="unknow"||this.datos.Planeta__c=="") {
        this.disabledPlaneta=false;
      }else{this.disabledPlaneta=true};
      if (this.datos.Altura__c==="n/a"||this.datos.Altura__c=="unknow"||this.datos.Altura__c=="") {
        this.disabledAltura=false;
      }else{this.disabledAltura=true};
      if (this.datos.Color_cabello__c==="n/a"||this.datos.Color_cabello__c=="unknow"||this.datos.Color_cabello__c=="") {
        this.disabledCabello=false;
      }else{this.disabledCabello=true};
      if (this.datos.Color_ojos__c==="n/a"||this.datos.Color_ojos__c=="unknow"||this.datos.Color_ojos__c=="") {
        this.disabledOjos=false;
      }else{this.disabledOjos=true};
      if (this.datos.Genero__c==="n/a"||this.datos.Genero__c==="unknow"||this.datos.Genero__c==="") {
        this.disabledGenero=false;
      }else{this.disabledGenero=true};
      if (this.datos.URL__c==="n/a"||this.datos.URL__c=="unknow"||this.datos.URL__c=="") {
        this.disabledURL=false;
      }else{this.disabledURL=true};
      
    }
  

  showNotification(title, message, variant) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
    });
    this.dispatchEvent(evt);
  }


  handleClick(){
    var num=this.template.querySelector("lightning-input[data-my-id=in3]").value;
    var valores=[];
    console.log("hola");
    //obtenerPersonaje({id:num}).then(val => console.log(val));
    obtenerPersonaje({id:num})
    .then((val)=>{
      this.showNotification('Success','Personaje encontrado')
      this.datos=val;
      this.disabledSave=false;  
      this.validaciones();
    })
    .catch(error=>this.showNotification('No se encontro personaje con ese ID',error));
  }
  
  guardarContacto(){
    var personajeFinal=new Object();
    
    //Intente hacerlo de una forma mas amena con onchange u otros pero no logre que funcione

    var name=this.template.querySelector("lightning-input[data-my-id=in4]").value;
    var altura=this.template.querySelector("lightning-input[data-my-id=in5]").value; 
    var colorCabello=this.template.querySelector("lightning-input[data-my-id=in6]").value;
    var colorOjos=this.template.querySelector("lightning-input[data-my-id=in7]").value;
    var genero=this.template.querySelector("lightning-input[data-my-id=in8]").value;
    var url=this.template.querySelector("lightning-input[data-my-id=in9]").value;
    var planeta=this.template.querySelector("lightning-input[data-my-id=in10]").value;
    var numPers=this.template.querySelector("lightning-input[data-my-id=in11]").value;
    personajeFinal.LastName=name;
    personajeFinal.Altura__c=altura;
    personajeFinal.Color_cabello__c=colorCabello;
    personajeFinal.Color_ojos__c=colorOjos;
    personajeFinal.Genero__c=genero;
    personajeFinal.URL__c=url;
    personajeFinal.Planeta__c=planeta;
    personajeFinal.Numero_personaje__c=numPers;
    console.log("valores input " + JSON.stringify(personajeFinal));
    saveContact({contacto:personajeFinal})
    .then(()=>{
      this.showNotification('Success','El personaje se creo Correctamente')
    })
    .catch(error=>this.showNotification('No se puede crear personaje con mismo ID',error));
    }
  
      
}
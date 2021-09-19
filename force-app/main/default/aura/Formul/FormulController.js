({
	buscador : function(component, event, helper) {
		let numero = component.get("v.buscadorStar"); //trae los datos seteado por el input del cmp
    	let action = component.get("c.obtenerPersonaje"); //backend apex
        action.setParams({
          id: numero
        });
       
        action.setCallback(this, function(response) {
          let state = response.getState();
          if (state === "SUCCESS") {
                let inputs = component.find("starWarsform"); //trae inputs del cmp  
                component.set("v.datos", response.getReturnValue()); //setea datos
              	let btn= component.find("btnGuardar");
              	btn.set("v.disabled",false)
                for (let i = 0; i < inputs.length; i++) {
                  if (inputs[i].get("v.value") === "n/a" || inputs[i].get("v.value") === "" || inputs[i].get("v.value") === "unknown") {
                      inputs[i].set("v.disabled", false);
                  } else {
                      inputs[i].set("v.disabled", true);
                  }
                }

          } else {

            let errors = response.getError();  
            console.log(errors[0].message);
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({  //no existe el personaje cartel
              title: "error!",
              message: errors[0].message
            });
            toastEvent.fire();
            btn.set("v.disabled",false)
          }
        });
    
            $A.enqueueAction(action);
    },
    createContact: function(component, event, helper) {
    	let action = component.get("c.saveContact");
    	let datos = component.get("v.datos");
    	action.setParams({
      		contacto: datos
  		});
        
        action.setCallback(this, function(response) {
          let state = response.getState();
          if (state === "SUCCESS") {
            let toastEvent = $A.get("e.force:showToast");
              //component.set('input1','un dato');
              toastEvent.setParams({
              title: "Ingreso exitoso!",
              message: "El registro se creo correctamente."
            });
            toastEvent.fire();
          } else {
            let errors = response.getError();
            console.log(errors[0].message);
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
              title: "error!",
              message:"El personaje ya existe y no puede volver a ser ingresado"
            });
            toastEvent.fire();
          }
        });
     $A.enqueueAction(action);
        
  }
})
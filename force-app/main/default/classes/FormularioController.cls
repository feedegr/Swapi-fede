public with sharing class FormularioController {
        @AuraEnabled
        public static Contact obtenerPersonaje(integer id){
                Contact personaje = new Contact();
                String planetaUrl='';
                String planeta; planetaUrl.substringBetween('planets/','/');
                Http http = new Http();
                HttpRequest request = new HttpRequest();
                request.setEndpoint('https://swapi.dev/api/people/' + id + '/?format=json');
                request.setMethod('GET');
                HttpResponse response = http.send(request);

                if (response.getStatusCode() == 200) {
                    Map<String, Object> resultado = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                    personaje.LastName=(String) resultado.get('name');
                    personaje.Altura__c =(String) resultado.get('height');
                    personaje.Color_cabello__c =(String) resultado.get('hair_color');
                    personaje.Color_ojos__c =(String) resultado.get('eye_color');
                    personaje.Genero__c =(String) resultado.get('gender');
                    personaje.URL__c = (String) resultado.get('url');
                    planetaUrl=(String) resultado.get('homeworld');
                    planeta=planetaUrl.substringBetween('planets/','/');
                    personaje.Planeta__c = getPlaneta(planeta);
                    personaje.Numero_personaje__c =(Integer) id;

                }else{
                    throw new AurahandledException('Ups, ese personaje no existe');
                }
             return personaje;
    }
   public static String getPlaneta(String id){
        String nomPlaneta='';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://swapi.dev/api/planets/'+id+'/?format=json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> resultado = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            nomPlaneta= (String) resultado.get('name');
             }
        return nomPlaneta;
    }
    @AuraEnabled
    public static Contact saveContact(Contact contacto) {

        try{
            insert contacto;

        }catch (DMLexception ex) {
             ex.getDMLMessage(0);
             Throw new AuraHandledException(ex.getDMLMessage(0));
        }

        return contacto;
    }
}


exports.InsertCamundaRequestQuery=function (data) {

   var query = `
    
            insert into 
            camunda_workflow_request
            (   
                process_name,
                process_definition_id,
                process_instance_id,
                task_name,
                task_id,
               /* task_variables,*/
                type_of_request,
                status,
                created_by,
                created_date
            )

            values 
            (
            '${data.PROCESS_NAME}',
            '${data.PROCESS_DEFINITION_ID}',
            '${data.PROCESS_INSTANCE_ID}',
            '${data.TASK_NAME}',
            '${data.TASK_ID}',
            /*'${data.TASK_VARIABLES}',*/
            '${data.TYPE_OF_REQUEST}',
            '${data.STATUS}',
            '${data.CREATED_BY}',
            '${data.CREATED_DATE}'
            )

            `
return query

}



exports.UpdateCamundaRequestQuery = function (process_instance_id,task_id,status) {

    var query = `
            update camunda_workflow_request 
            set status = '${status}' 
            where process_instance_id='${process_instance_id}' 
            AND task_id ='${task_id}'
 
             `
 return query
 
 }
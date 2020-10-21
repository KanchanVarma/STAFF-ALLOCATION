exports.InsertAuditTracsactionQuery=function (audit_event_id , month , year , sqldate , user_id , ip_address) {

    query =  `insert into audit_transaction 
                (
                    audit_event_id,
                    month,
                    year,
                    sqldate,
                    user_id,
                    ip_address

                )
            values(
                ${audit_event_id},
                ${month},
                ${year},
                '${sqldate}',
                ${user_id},
                '${ip_address}'
                )
                 returning id 
            
                `
    return query

}
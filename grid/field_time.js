records[I].vm_custom[field]=true;
td.html('<input style="border:0; width:100px" type=Time />')
td.find('input').val(records[I][field])
td.find('input').on('input', function(){
    set_value($(this).val(),records,I,field);
});

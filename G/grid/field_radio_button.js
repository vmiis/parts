records[I].vm_custom[field]=true;
td.html(html)
td.find('input[value="'+records[I][field]+'"]').prop('checked', true);
td.find('input').on('change', function(){
    var c=$('input:checked').val();
    set_value(c,records,I,field);
});

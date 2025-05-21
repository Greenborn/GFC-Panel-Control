export function get_dictionary_from_array( array, key, type = 'array' ){
    let dictionary = {}
    for (let i = 0; i < array?.length; i++)
        if (array[i][key]) {
        if (!dictionary[array[i][key]])
            dictionary[array[i][key]] = []
        if (type == 'array')
            dictionary[array[i][key]].push( array[i] )
        else
            dictionary[array[i][key]] = array[i]
        }
    return dictionary
}
//- array, object, string 
//- will be analyze in this service
module.exports = {

    convertToCreate: function(options)
    {
        //- seperate by comma (,)
        var plainString = options.plainString;
        //- fixed data
        var fixedID = options.fixedID;
        var fixedName = options.fixedName;

        var fixedName2 = options.fixedName2;

        //- ingredients
        // var aValues = plainString.split(','); // => []
        var aValues = plainString; // => []
        console.log(typeof(aValues));
        aValues.unshift(fixedID);
        var aKeys = [fixedName];

        //- final array
        var final = [];
        
        //- count ingredients values
        for(var i=0; i<(aValues.length-1);)
        {
            aKeys.push(fixedName2);
            //- adding dish id
            //- push to final array
            final.push(_.zipObject(aKeys, aValues));
            i++;
        }
        return final;
    },

}
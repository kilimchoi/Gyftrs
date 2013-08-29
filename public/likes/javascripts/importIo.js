importio.init({"auth": {
    "userGuid": "c4148a01-6fe5-48a2-996f-adce08b49a4f",
    "apiKey": "rHAUfszXFpLCiJ2mxIz+Ybn3MldEok/fqnazPlh1rWrawek0YFJLQAxMgHNH8jCPdZGKYpowXLF3d5Hn9+r2sQ=="
  }});

  $(document).ready(function() {
    $('#search_button').click(function() {
      console.log("enters here");
      var query_object = {"requestId":"testquery","input":{"artist_name":$('#artist_name').val()},"connectorGuids":["103c2bfd-8696-4ecc-a940-a326e3c39e35"]};
      importio.query(
        query_object,
        function(data) {
            console.log("enters here");
            var jsonData = data;
            var productCodeArr = [];
            console.log(jsonData);
            for(var i = 0; i < jsonData.length; i++) {
              var url = data[i].data.url.split("/");
              productCodeArr[i] = url[5];
            }
            console.log("productCodeArr is: ", productCodeArr);
            var query_object2 = {"requestId":"testquery","input":{"fieldkeywords_1":productCodeArr[0],"fieldkeywords_3":productCodeArr[1],"fieldkeywords_2":productCodeArr[2]},"connectorGuids":["e9bf08fd-78c6-491f-a988-a5c0361a7a74"]};
        }
      );
    });
  });

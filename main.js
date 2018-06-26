//    {
//        "gamesObject": [
//            {
//                "date": "1 September",
//                "team_1": "U1",
//                "team_2": "U4",
//                "location": "AJ Katzenmaier",
//                "time": "09:30am",
//
//
//        },
//            {
//                "date": "1 September",
//                "team_1": "U3",
//                "team_2": "U2",
//                "location": "Greenbay",
//                "time": "13:00pm",
//
//        },
//            {
//                "date": "8 September",
//                "team_1": "U5",
//                "team_2": "U6",
//                "location": "Howard A Yeager",
//                "time": "09:30am",
//
//
//            },
//            {
//                "date": "8 September",
//                "team_1": "U6",
//                "team_2": "U1",
//                "location": "Marjorie P Hart",
//                "time": "13:00pm",
//            },
//            {
//                "date": "15 September",
//                "team_1": "U2",
//                "team_2": "U4",
//                "location": "North",
//                "time": "09:30am",
//            },
//            {
//                "date": "15 September",
//                "team_1": "U3",
//                "team_2": "U5",
//                "location": "AJ Katzenmaier",
//                "time": "13:00pm",
//            },
//            {
//                "date": "22 September",
//                "team_1": "U2",
//                "team_2": "U6",
//                "location": "South",
//                "time": "09:30am",
//            },
//            {
//                "date": "22 September",
//                "team_1": "U3",
//                "team_2": "U5",
//                "location": "Howard A Yeager",
//                "time": "13:00pm",
//            }
//
//],
//        "teams": ["U1", "U2", "U3", "U4", "U5", "U6"],
//        "locations": {
//            "AJ Katzenmaier": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.7810520615812!2d-87.86492878519806!3d42.32586847918923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f932fbc6ba7cd%3A0xcf2bbe275c6da815!2sA+J+Katzenmaier+Elementary+School!5e0!3m2!1snl!2snl!4v1529927888834",
//
//            "Greenbay": "",
//
//            "Howard A Yeager": "",
//
//            "Marjorie P Hart": "",
//
//            "North": "",
//
//            "South": ""
//        },
//
//
//    }


var main = new Vue({
    el: '#main',
    data: {
        games: [],
        dates: [],
        teams: [],
        locations: [],
        locationNames: [],
        path: 0,


    },
    created: function () {
        this.start();


    },
    methods: {
        start: function () {
            var fetchConfig =
                fetch("https://api.myjson.com/bins/v6ygu", {
                    method: "GET",
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }

                }).then(function (json) {

                    var data = json;
                    console.log("data", data);

                    main.games = data.gamesObject;
                    main.teams = data.teams;
                    main.locations = data.locations;
                    //                    console.log(main.locations);
                    //                    console.log(main.games);
                    main.findDates();
                    //                    main.seeAllPage();
                    //                        main.removeDuplicates(main.games);
                    main.findTheLocations();
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        mainToCalendar: function () {
            this.path = 1;
        },
        changePage: function () {
            this.path = 2;

        },
        togglePages: function (date) {
//            this.path = 3;
            var x = document.querySelector("[data-name='"+date+"']")
//            document.getElementById("date_heading").innerHTML = x;
            console.log(x)
            
            //            var data = $('.date').data('name');
            //            var attrmethod = $('.date').attr('data-name');
            //            alert(data);
            //            alert(attrmethod);
            //            var element = document.querySelector(".date");
            //            var dataset = element.value;
            //            var date_heading = document.querySelector("#date_heading");
            //            date_heading.innerHTML = dataset.name;
            //            var className = $('#btn').attr('class');
            //            document.getElementById('date_heading').innerHTML = className;
        },
        mainToTeams: function () {
            this.path = 4;
        },
        mainToLocation: function () {
            this.path = 5;
        },
        mainToChat: function () {
            this.path = 6;
        },
        findDates: function () {
            var games = this.games;
            var array = [];
            for (h = 0; h < games.length; h++) {
                if ((2 * h + 1) < games.length) {

                    array.push(games[2 * h + 1].date);
                }
            }
            //            console.log(main.allDates);
            this.dates = array;
        },
        findTheLocations: function () {
            var empty = [];
            var locations = this.locations;
            for (var location in locations) {
                empty.push(location);
            }
            //            console.log(empty);
            var locationNames = this.locationNames;
            locationNames = empty;
            this.locationNames = locationNames;

            console.log(this.locationNames);
        },

        //            removeDuplicates: function (array) {
        //                //            let teams = [];
        //                for (let i = 0; i < array.length; i++) {
        //                    if (this.teams.indexOf(array[i].team_1) == -1) {
        //                        this.teams.push(array[i].team_1);
        //                    }
        //                }
        //                console.log(this.teams);
        //                //            this.teams.push(unique_array);
        //            }
    },

})

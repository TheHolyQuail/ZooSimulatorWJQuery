//possible future additions: animals can only eat foods that are possible favorite foods

var foodOptionIds = ["meat",
    "fish",
    "beef",
    "chicken",
    "soy",
    "beans",
    "grass",
    "fruit",
    "sugar",
    "grain",
    "leaves",
    "honey",
    "nectar",
    "mercury",
    "silver",
    "gold",
    "pearl",
    "stew"];
//for getting the objects
var animalObj = [];

//for updating zoo
var animals = [];
var animalIds = [];
var animalNames = [];
var animalPopulation = 0;

//for monstrosity
var killedAnimals = 0;
var firstMonster = true;

//for feeding and destroying
var clicked;

$(document).ready(function() {
    var tigger = new Tiger("Tigger");
    animalNames.push("Tigger");
    animals.push("tiger");
    animalIds.push(animalIds.length + 1);
    animalObj.push(tigger);

    var pooh = new Bear("Pooh");
    animalNames.push("Pooh");
    animals.push("bear");
    animalIds.push(animalIds.length + 1);
    animalObj.push(pooh);

    var rarity = new Unicorn("Rarity");
    animalNames.push("rarity");
    animals.push("unicorn");
    animalIds.push(animalIds.length + 1);
    animalObj.push(rarity);

    var gemma = new Giraffe("Gemma");
    animalNames.push("gemma");
    animals.push("giraffe");
    animalIds.push(animalIds.length + 1);
    animalObj.push(gemma);

    var stinger = new Bee("Stinger");
    animalNames.push("stinger");
    animals.push("bee");
    animalIds.push(animalIds.length + 1);
    animalObj.push(stinger);

    update();

    $("body").on("click",".animal",function() {
        let id = $(this).attr('id');
        //edit animal tab is opened
        $("#animalSpecific").show();
        //make animal tab is closed
        $("#creation").hide();

        clicked = parseInt(id);
    });

    $("body").on("click","#deleteAnimal",function(){
        //finds selected animal
        let location = animalIds.indexOf(clicked);

        actionLog("You destroyed a " + animals[location] + " named "+ animalNames[location]);

        //update global variables removing selected animal
        animals.splice(location, 1);
        animalIds.splice(location, 1);
        animalNames.splice(location, 1);
        animalObj.splice(location, 1);
        animalPopulation --;
        killedAnimals ++;

        update();

        //edit animal tab is opened
        $("#animalSpecific").hide();
        //make animal tab is closed
        $("#creation").show();
    });

    $("body").on("change","#foodSelect",function () {
        $("#actionLog").empty();
        var type = $("#foodType").val();
        var animalPlace = animalIds.indexOf(clicked);


        var noError = true;
        if(type.length > 1){
            console.log(animalIds[animalPlace]);
            animalObj[animalPlace].eat(type);
        } else{
            alert("ERROR: 01: no food type selected");
            noError = false;
        }
        if(noError) {
            //edit animal tab is opened
            $("#animalSpecific").hide();
            //make animal tab is closed
            $("#creation").show();

            update();
        }
    });

    $("body").on("click","#exit",function () {
        //to exit the feed/destroy animal menu

        //edit animal tab is opened
        $("#animalSpecific").hide();
        //make animal tab is closed
        $("#creation").show();
    });

    $("body").on("click","#create",function() {
        //collects data from other create animal inputs
        var type = $("#animalType").val();
        var name = $("#name").val();
        var id = animalIds.length + 1;
        var newAnimal;

        //used to make sure an animal type is selected
        var noError = true;

        $("#name").val('');

        if(name.length < 1){
            alert("ERROR: 02: you forgot to name your animal... you monster");
            noError = false;
        }

        if (noError) {
            //creates the animal
            switch (type) {
                case 'tiger':
                    newAnimal = new Tiger(name);
                    actionLog("You created a tiger named " + name);
                    break;
                case 'bear':
                    newAnimal = new Bear(name);
                    actionLog("You created a Bear named " + name);
                    break;
                case 'bee':
                    newAnimal = new Bee(name);
                    actionLog("You created a bee named " + name);
                    break;
                case 'giraffe':
                    newAnimal = new Giraffe(name);
                    actionLog("You created a giraffe named " + name);
                    break;
                case 'unicorn':
                    newAnimal = new Unicorn(name);
                    actionLog("You created a unicorn named " + name);
                    break;
                case 'monstrosity':
                    newAnimal = new Monstrosity(name);
                    actionLog("You created a mostrocity named " + name);
                    break;
                default:
                    //error
                    alert("ERROR: 01: no animal type selected");
                    noError = false;
                    break;
            }

            if (noError) {
                //documents the animal
                animalObj.push(newAnimal);
                animalNames.push(name);
                animals.push(type);
                animalIds.push(id);

                update();
            }
        }
    });
    $("#create").css("position", "relative").css("bottom", "20px").css("box-shadow", "2px 2px blue");
    $("#span").css("position", "relative").css("bottom", "20px").css("border", "1px solid").css("box-shadow", "2px 2px blue");
    $("#creation").css("position", "relative").css("padding", "20px");
});

function actionLog(text){
    var x = document.createElement("p");
    var t = document.createTextNode(text);
    x.appendChild(t);
    document.getElementById("actionLog").appendChild(x);
}

function update(){
    //adds monstrosity and suspicious stew to the animal and food drop downs respectively. I think you can guess what the stew is made of...

    if(killedAnimals == 3 && firstMonster == true) {
        firstMonster = false;
        //var foodSelect = $("#foodSelect");
        $("#foodType").append("<option value= 'stew'> suspicious stew </option>");

        //var animalSelect = $("#animalType");
        $("#animalType").append("<option value= 'monstrosity'> other... </option>");
    }

    //the following code updates the zoo visual
    //variables
    var zoo = "";
    var COUNT = animals.length;
    //clears div
    $("#zoo").html("");
    //starts new table in div
    zoo += "<table class='table'>";
    ///adds rows and column with content to the table
    var curAnimal;
    var curAnimalId;
    var curName;

    for(var i = 0; i < COUNT;i++){
        curAnimal = animals[i];
        curAnimalId = animalIds[i];
        curName = animalNames[i];

        if (i == 0){
            //adds the first row
            zoo += "<tr>";
        }
        //add a column until there are three in a row then makes a new row with the else statement
        if (i % 5 != 0 && i != 0) {
            zoo += "<td><img src='images/"+ curAnimal +".jpg' width='100' heigth='100' alt='an animal in your zoo' class='animal' id='"+ curAnimalId +"'><p>"+ curName +" the "+ curAnimal +"</p></td>";
        } else {
            zoo += "</tr><tr><td><img src='images/"+ curAnimal +".jpg' width='100' heigth='100' alt='an animal in your zoo' class='animal' id='"+ curAnimalId +"'><p>"+ curName +" the "+ curAnimal +"</p></td>";
        }
        if (COUNT - i == 1){
            zoo += "</tr>";
        }
    }
    //closes the table
    zoo += "</table>";
    //appends table to div
    $(zoo).appendTo( '#zoo' );
}

//Animal super code
class Animal {
    constructor(name, type, foods) {
        this.name = name;
        this.type = type;
        this.foods = foods;
        var x = Math.floor((Math.random() * this.foods.length) + 1);
        this.favoriteFood = this.foods[x];

        animalPopulation++;
    }

    static getPopulation() {
        return animalPopulation;
    }

    eat(food){
        console.log(this.name + " eats " + food);
        //adds the eating action to the list
        food == this.favoriteFood ? actionLog("YUM!!! " + this.name + " wants more " + food) : this.sleep();
    }

    sleep(){
        //adds the sleeping action to the list
        actionLog(this.name + " sleeps for 8 hours");

    }
}

//Tiger
class Tiger extends Animal {
    constructor(name) {
        var foods = ["meat", "fish", "beef", "chicken", "soy"];
        super(name, "tiger", foods);
    }
}

//Bear
class Bear extends Animal {
    constructor(name) {
        var foods = ["meat", "fish", "beef", "chicken", "soy", "fruit", "beans"];
        super(name, "bear", foods);
    }
    sleep(){
        actionLog(this.name + " hibernates for 4 months");
    }
}

//Bee
class Bee extends Animal {
    constructor(name) {
        var foods = ["honey", "nectar", "sugar"];
        super(name, "bee", foods);
    }

    eat(food){
        if(food == this.favoriteFood){
            actionLog(this.name + " eats " + food);
        }
        food == this.favoriteFood ? actionLog("YUM!!! " + this.name + " wants more " + food) : actionLog("YUCK!!! " + this.name + " will not eat " + food);
        if(food == this.favoriteFood){
            this.sleep()
        }
    }

    sleep(){
        actionLog(this.name + " never sleeps");
    }
}

//Giraffe
class Giraffe extends Animal {
    constructor(name) {
        var foods = ["fruit", "grass", "grain", "leaves"];
        super(name, "giraffe", foods);
    }

    eat(food){
        if(food == this.favoriteFood){
            actionLog(this.name + " eats " + food);
        }
        food == this.favoriteFood ? actionLog("YUM!!! " + this.name + " wants more " + food) : actionLog("YUCK!!! " + this.name + " will not eat " + food);
        if(food == this.favoriteFood){
            this.sleep()
        }
    }
}

//Unicorn
class Unicorn extends Animal {
    constructor(name) {
        var foods = ["mercury", "silver", "gold", "pearl"];
        super(name, "tiger", foods);
    }

    sleep(){
        actionLog(this.name + " sleeps in a cloud");
    }
}

class Monstrosity extends Animal {
    constructor(name) {
        var foods = ["stew"];
        super(name, "monstrosity", foods);
    }
    eat(food){
        console.log(this.name + " eats " + food);
        //adds the eating action to the list
        food == "stew" ? actionLog("YUM!!! " + this.name + " is satisfied ... for now ") : this.sleep();
    }
    sleep(){
        //adds the sleeping action to the list
        actionLog(this.name + " prowls the night for prey");

    }
}
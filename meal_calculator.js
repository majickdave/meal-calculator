var Diner = function(name, dishes) {
  this.name = name;
  this.dishes = dishes;
};

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

Diner.prototype.addDishes = function() {
    var total = 0;
    var dishes = this.dishes;
    dishes.forEach(function(dish) {
        total += dish.price;
    });
    return round(total, 2);
};

var calculateTax = function(total) {
  var tax = 0.07;
  return total * tax;
};

var calculateTip = function(total) {
    var tip = 0.20;
    return total * tip;
}

var david = new Diner('david', [ { dish: 'fish', price: 15 }, { dish: 'chicken', price: 10 } ]);

var sitian = new Diner('sitian', [ { dish: 'pork', price: 12 }, { dish: 'beef', price: 17 } ]);

var emily = new Diner('emily', [ { dish: 'rice', price: 9 }, { dish: 'vegetables', price: 8 } ]);

var Bill = function(diners) {
  this.diners = diners;
};

Bill.prototype.totalAndPrint = function () {
    var diners = this.diners;
    var total = 0;
    diners.forEach(function(diner) {
        var subTotal = diner.addDishes();
        var tax = calculateTax(subTotal);
        total += subTotal + tax;
    });
    return total;
};

Bill.prototype.tipTotal = function() {
    var diners = this.diners;
    var totalTip = 0;
    diners.forEach(function(diner) {
        var subTotal = diner.addDishes();
        var tip = calculateTip(subTotal);
        totalTip += tip;
    });
    return totalTip;
};

Bill.prototype.breakDown = function() {
    var diners = this.diners;
    var dinerBreakdown = [];
    diners.forEach(function(diner) {
        var name = diner.name;
        var subTotal = diner.addDishes();
        var tax = calculateTax(subTotal);
        var tip = calculateTip(subTotal);
        var total = subTotal + tax + tip;
        dinerBreakdown.push({
            'name': name,
            'total': round(total, 2),
            'tax': round(tax, 2),
            'tip': round(tip, 2)
        });
    });
    console.log(dinerBreakdown);
};

var diners = [david, sitian, emily];

var bill = new Bill(diners);

var taxPlusTotal = bill.totalAndPrint();

var tipTotal = bill.tipTotal();

console.log("Total Bill: " + round(taxPlusTotal, 2));
console.log("Total Tip: " + round(tipTotal, 2));

var breakdown = bill.breakDown();

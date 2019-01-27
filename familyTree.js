findNearest = function(family, newMember){
    function Family() {
        this.father = null;
    }
    Family.prototype.addMember = function(val) {
        var n = new Member(val);
        if (this.father == null) {
          this.father = n;
        } else {
          this.father.addMember(n);
        }
    }
    Family.prototype.search = function(val) {
        var found = this.father.search(val);
        return found;
    }
    function Member(val) {
        this.diet = val;
        this.lower = null;
        this.higher = null;
    }
    Member.prototype.addMember = function(n) {
        if (n.diet < this.diet) {
          if (this.lower == null) {
            this.lower = n;
          } else {
            this.lower.addMember(n)
          }
        } else if (n.diet > this.diet) {
          if (this.higher == null) {
            this.higher = n;
          } else {
            this.higher.addMember(n);
          }
        }
    }
    Member.prototype.search = function(val) {
        if (this.diet == val) {
            return this;
          } 
        else if(val < this.diet && this.lower!=null){
            var highestNode = this.lower.highestNode();
            if(Math.abs(highestNode.diet-val)>Math.abs(this.diet-val)){
                return this;
            }else{
                return this.lower.search(val);
            }
        } 
        else if(val > this.diet && this.higher!=null){
            var lowestNode = this.higher.lowestNode();
            if(Math.abs(lowestNode.diet-val)>Math.abs(this.diet-val)){
              return this;
            }else {  return this.higher.search(val);
            }
        }
        else return this;
    }
    Member.prototype.lowestNode = function(){
        if(this.lower!=null){
            return this.lower.lowestNode();
        }else{
            return this;
        }
    }
    Member.prototype.highestNode = function(){
        if(this.higher!=null){
            return this.higher.highestNode();
        }else{
            return this;
        }
    }
    
    var Family = new Family();
    for (var i = 0; i < family.length; i++) {
      Family.addMember(family[i]);
    }
    var result = Family.search(newMember);
    console.log(result.diet);
}

findNearest([100, 50, 150, 20, 60, 230, 130], 120);

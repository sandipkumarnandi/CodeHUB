//  Creating base Implementation to Perform all the related and Similar Task  
export default class BaseImplementation
 {
  // Providing some Basics Attribute to Implementation to Store Data Related Data
  collection = [];
  // this is there the Key inside Local Storage where i your Data lies 
  key_main = "";

// to construct main Key
  constructor(key) {
    //get it from session
    // setting Main Key
    this.key_main = key;
    
    let collection_temp = localStorage.getItem(key);
    //  checking , Is localStorage has the collection or not , if Not setting it to Empty array 
    this.collection = collection_temp != null ? JSON.parse(collection_temp) : [];

  }

  /**
   * This function will be used to add data to session/local
   * @param {*} model  Model that needs to be added
   */
  Add(model) {
    // finding MaxID From the List
    let maxNum = this.arrayMax(this.collection);
    // setting new Max Id
    let new_id = maxNum + 1;
    model["id"] = new_id;

    // using Spread operator to push Data 
    this.collection = [...this.collection, model];
    // there After updating LocalStorage
    this.UpdateStore(this.key_main);
    return true;
  }

  Update(id, model) {
    let index;
    // Finding index of data in the collection according to given Id so that we can Update it
    this.collection.forEach((item, ind) => {
      if (item.id == id) {
        index = ind;
        return;
      }
    });
    // Updating Collection 
    this.collection.splice(index, 1, model);
    // after that Updating localStorage 
    this.UpdateStore(this.key_main);
  }

  Delete(id) {
    // Deleting Data from the Collection using Filter Method
    this.collection = this.collection.filter((item) => item.id != id);
    // Updating LocalStorage
    this.UpdateStore(this.key_main);
  }

  UpdateStore(key) {
    // this function used to update the localstorage data
    localStorage.setItem(key,JSON.stringify(this.collection))

/* First, we’re creating a function called UpdateStore.
 Next, we’re setting the localStorage.setItem function to a variable called setItem.
 Then, we’re setting the key to the localStorage key we’re going to use, which is “collection”.
 Next, we’re setting the value to the JSON.stringify of the collection object.
 Finally, we’re setting the localStorage.setItem function to the setItem variable.

 */
  }



  // This Function Will Help us find the max index in the list using reduce function  
  arrayMax(arr) {
    let max_id = arr.length === 0 ? 0 : null;

    if (arr.length === 1) {
      max_id = arr[0].id;
    } else if (arr.length > 1) {
      let max_id_temp = arr.reduce(function (p, v) {
        return p.id > v.id ? p.id : v.id;
      });

      max_id = max_id_temp;
    }

    return max_id;
  }

/*
1. The arrayMax function takes an array of objects as an argument.
2. The function returns the maximum value of the id property of the objects in the array.
3. If the array is empty, the function returns 0.
4. If the array has only one object, the function returns the id property of that object.
5. If the array has more than one object, the function returns the maximum value of the id property of the objects in the array.

*/



  // This Function will give the a array of Related Search  
  search(searchText)
  { 
      let filterData = this.collection.filter((item)=>{
        let string = JSON.stringify(item).toLowerCase()
        return string.includes(searchText.toLowerCase())
      })
    return filterData

    // let filterData = this.collection.map((item)=>{
    //   return Object.values(item)
    // })
   
  }
  // this is Upcoming Feature 
  sort()
  {
    // no worth RIGHT now
  }

}

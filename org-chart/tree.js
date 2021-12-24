var data = {
    "fname": "Rachel",
    "lname": "Rogers",
    "title": "CEO",
    "children": [
      {
        "fname": "Bob",
        "lname": "Smith",
        "title": "President",
        "children": [
          {
            "fname": "Mary",
            "lname": "Jane",
            "title": "Vice President",
            "children": [
              {
                "fname": "Gary",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "Norman",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "Reginald",
                "lname": "Yoyo",
                "title": "Line Assembly",
                
              }
            ]
          },
          {
            "fname": "Bernhard",
            "lname": "Ringwald",
            "title": "Comptroller",
            "children": [
              {
                "fname": "Nathan",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "Buck",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "Jim",
                "lname": "August",
                "title": "Dock Worker",
                
              }
            ]
          },
          {
            "fname": "Jane",
            "lname": "Ringwald",
            "title": "Comptroller",
            "children": [
              {
                "fname": "Joseph",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "Jocelyn",
                "lname": "August",
                "title": "Dock Worker",
                
              },
              {
                "fname": "David",
                "lname": "August",
                "title": "Dock Worker",
                
              }
            ]
          },
          {
            "fname": "Emma",
            "lname": "Jane",
            "title": "Vice President",
            
          },
          {
            "fname": "Sophia",
            "lname": "Jane",
            "title": "Vice President",
            
          }
        ]
      }
    ]
  }
  
  findElement = (data, searchValue, level) => {
    //Set level.
    if (!level) { level = 0 }
    if (!data) return
    //Iterate over children.
    if (!data.hasOwnProperty('children')) { 
      console.log(data['fname'])
    } 
  
    findElement(data.children, searchValue, ++level)
  }
  
  findElement(data);
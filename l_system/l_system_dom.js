// declare main variables
var n = 0;

let angle;
let length;
let len;
let axiom;
let drawing;
let rules;

// after loading
function load() {
  angle = 25.7 * Math.PI / 180;
  length = 70;
  len = length;
  axiom = "F";
  drawing = axiom;
  rules = [
    {
      from: "F",
      to: "F[+F]F[-F]F"
    }
  ];
  
  updateCustom();
  draw();
}

function changeTab(from, to) {

  // if tab is selected already, return
  let fromTab = document.getElementById(`${from}-tab`);
  if (fromTab.classList.contains('unselected')) return;

  // if not selected, change visibility
  let toTab = document.getElementById(`${to}-tab`);
  let fromSettings = document.getElementById(`${from}-settings`);
  let toSettings = document.getElementById(`${to}-settings`);

  fromTab.classList.add('unselected');
  toTab.classList.remove('unselected');
  fromSettings.classList.replace('shown', 'hidden');
  toSettings.classList.replace('hidden', 'shown');

}

// presets
function setPreset(num) {
  if (num == 1) {
    setVals(25.7, 70, "F", [{
      from: "F",
      to: "F[+F]F[-F]F"
    }]);
  } else if (num == 2) {
    setVals(20, 250, "F", [{
      from: "F",
      to: "F[+F]F[-F][F]"
    }]);
  } else if (num == 3) {
    setVals(22.5, 150, "F", [{
      from: "F",
      to: "FF-[-F+F+F]+[+F-F-F]"
    }]);
  } else if (num == 4) {
    setVals(20, 250, "X", [
      {
        from: "X",
        to: "F[+X]F[-X]+X"
      },
      {
        from: "F",
        to: "FF"
      }
    ]);
  } else if (num == 5) {
    setVals(25.7, 250, "X", [
      {
        from: "X",
        to: "F[+X][-X]FX"
      },
      {
        from: "F",
        to: "FF"
      }
    ]);
  } else if (num == 6) {
    setVals(22.5, 200, "X", [
      {
        from: "X",
        to: "F-[[X]+X]+F[+FX]-X"
      },
      {
        from: "F",
        to: "FF"
      }
    ]);
  }
  reset();
  updateCustom();
}

// update from DOM sliders
function sliderUpdate(type, value) {
  let txt = document.getElementById(`${type}Text`);
  
  if (type == 'angle') {
    txt.innerHTML = 'Angle: ' + value/10;
    angle = value*Math.PI/1800;
  } else if (type == 'length') {
    txt.innerHTML = 'Length: ' + value;
    length = value;
    len = length / Math.pow(2, n);
  }

  draw();
}

// to iterate using custom settings
function customIterate() {

  let axiomTxt = document.getElementById('axiomText').value;
  document.getElementById('axiomLabel').innerHTML = axiomTxt;

  let rule1 = document.getElementById('ruleText1').value;
  let rule2 = document.getElementById('ruleText2').value;

  /*
    converting text to rule json format
  */
  let from1 = '';
  let to1 = '';
  let from2 = '';
  let to2 = '';
  let combinedRules = [];

  // remove all whitespace using regex
  rule1 = rule1.replace(/ /g, '');
  rule2 = rule2.replace(/ /g, '');

  // find rules from rule 1
  if (rule1 != '') {
    
    // find from and to for rule 1
    for (var i = 0; i < rule1.length; i++) {
      let arrow = rule1.slice(i, i+2);

      if (arrow == '->') {
        from1 = rule1.substring(0, i);
        to1 = rule1.substring(i+2, rule1.length);
        break;
      }
    }

    // combine from and to for rule 1
    combinedRules.push({
      from: from1,
      to: to1
    });

  }

  // find rules from rule2
  if (rule2 != '') {

    // find from and to for rule 2
    for (var i = 0; i < rule2.length; i++) {
      let arrow = rule2.slice(i, i+2);

      if (arrow == '->') {
        from2 = rule2.substring(0, i);
        to2 = rule2.substring(i+2, rule2.length);
        break;
      }
    }

    // combine from and to for rule 2
    combinedRules.push({
      from: from2,
      to: to2
    });

  }

  axiom = axiomTxt;
  rules = combinedRules;

  iterate();
}

// update the axiom label
function updateAxiom() {
  let customAxiom = document.getElementById('axiomText').value;
  document.getElementById('axiomLabel').innerHTML = customAxiom;
}

// change custom settings
function updateCustom() {
  document.getElementById('angleText').innerHTML = 'Angle: ' + angle*180/Math.PI;
  document.getElementById('angleSlider').value = angle*1800/Math.PI;
  document.getElementById('lengthText').innerHTML = 'Length: ' + length;
  document.getElementById('lengthSlider').value = length;
  document.getElementById('axiomText').value = axiom;
  document.getElementById('axiomLabel').innerHTML = axiom;
  document.getElementById('ruleText1').value = rules[0].from + ' -> ' + rules[0].to;
  
  if (rules[1] != null) {
    console.log(rules[1]);
    document.getElementById('ruleText2').value = rules[1].from + ' -> ' + rules[1].to;
  } else {
    console.log('no rule2');
    document.getElementById('ruleText2').value = '';
  }
}
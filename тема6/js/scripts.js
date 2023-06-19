const prototypesList = document.getElementById("prototypes-list");
  const classNameInput = document.getElementById("class-name");
  const showPrototypesButton = document.getElementById("show-prototypes");

  showPrototypesButton.addEventListener("click", () => {
    const className = classNameInput.value;
    const classFunc = window[className];
    if (!classFunc || typeof classFunc !== "function") {
      classNameInput.style.borderColor = "red";
      return;
    }

    classNameInput.style.borderColor = "initial";

    const prototypes = [];
    let currentProto = Object.getPrototypeOf(classFunc.prototype);
    while (currentProto !== null) {
      prototypes.push(currentProto);
      currentProto = Object.getPrototypeOf(currentProto);
    }

    prototypesList.innerHTML = "";
    prototypesList.appendChild(
      document.createTextNode("Prototypes:")
    );

    for (let i = 0; i < prototypes.length + 1; i++) {
      const proto = i === prototypes.length ? classFunc.prototype : prototypes[i];
      const protoListItem = document.createElement("li");
      const protoName = proto.constructor.name || "[No Name]";
      const protoNameTextNode = document.createTextNode(protoName);
      protoListItem.appendChild(protoNameTextNode);

      const protoPropsListNode = document.createElement("ol");
      protoListItem.appendChild(protoPropsListNode);

      for (const propName of Object.getOwnPropertyNames(proto)) {
        const propListItem = document.createElement("li");
        const propNameTextNode = document.createTextNode(`${propName}: ${typeof proto[propName]}`);
        propListItem.appendChild(propNameTextNode);
        protoPropsListNode.appendChild(propListItem);
      }

      prototypesList.appendChild(protoListItem);
    }
  });
export function setOrderDetails(o,oNo,pNo) {
    let order;
    console.log(o);
    order = o.filter(val => {
        if (val.orderNumber == oNo || val.orderNumber == pNo)
            return val;
    })[0];
    order.userName = order.userInfo.firstName + ' ' + order.userInfo.lastName;
    if (order.shipping)
        order.address = (order.shipping.streetAddress ? order.shipping.streetAddress + ',' : '') + (order.shipping.city ? order.shipping.city + ', ' : '') + (order.shipping.state ? order.shipping.state + '-' : '') + (order.shipping.zipCode ? order.shipping.zipCode : '');
    else
        order.address = '-';
    let date = new Date(order.created);
    let mm = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
    order.date = mm + '/' + dd + '/' + date.getFullYear();
    return order
}
export function setProductsDetails(p) {
    let products = [];
    products = [...p];
    products = products.map(val => {
      let obj = { ...val };
      obj.variants = [];
      obj.isShell = true;
      let variantsName = [],
        variantsVal = [],
        customNames = [],
        customVals = [];
      for (let v in obj) {
        if (v.includes('has')) {
          let o = {
            name: v,
            nameToShow: v.split(/(?=[A-Z])/).reverse().slice(0, v.split(/(?=[A-Z])/).length - 1).reverse().join(' '),
            value: obj[v]
          }
          customNames.push(o);
          // }
        }
        if (v.includes('DisplayText')) {
          customVals.push(obj[v])
        }
        if (v.includes('variant')) {
          if (v.includes('Name')) {
            variantsName[parseInt(v.slice(7, 8)) - 1] = obj[v];
          }
          if (v.includes('Value')) {
            variantsVal[parseInt(v.slice(7, 8)) - 1] = obj[v];
          }
        }
      }
      variantsName.forEach((v, i) => {
        obj.variants[i] = {
          name: v,
          value: variantsVal[i],
          isShell: true
        };
      })
      let finalVal = customNames.map((v, i) => {
        let obj = { name: v.nameToShow, value: customVals[i], isShell: v.value }
        return obj
      }).filter(v => {
        if (v.isShell)
          return v
      })
      obj.customizations = finalVal;
      obj.imageToShow = obj.mainPictureURI.includes('http') ? obj.mainPictureURI : (obj.mainPictureURI.includes('//') ? obj.mainPictureURI : 'https://integration.ebusiness.pittsburghpublicsafety.com' + obj.mainPictureURI);

      if (obj.customizationPriceDetails) {
        if (obj.customizationPriceDetails.multiplePriceDetails) {
          obj.multipleProductsArray = []
          obj.multipleProductsArray = [...obj.customizationPriceDetails.summary.split(', ')]
          console.log('multi price details')
          console.log(obj.multipleProductsArray)
          obj.multipleProductsArray = obj.multipleProductsArray.map(val => {
            let o = {
              summary: val.split('$')[0],
              price: parseInt(val.split('$')[1])
            }
            return o
          })
        }
        obj.mp = JSON.stringify(obj.multipleProductsArray)
        console.log('customprice available')
      }
      return obj;
    })
    console.log(products)
    return products;
}
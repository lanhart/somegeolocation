const removeItemByIndex = function(arr, index){
    let array = [];
    for (let i in arr){
        let a = arr[i];
        if (i != index){
            array[array.length] = a;
        }
    }
    return array;
    console.log("deleted");
}

const randomId = function(length = 15) {
  return Math.random().toString(36).substring(2, length+2);
};

class PageView{
    constructor(url, method, block){
        this.url = url;
        this.method = method;
        this.views = [];
        this.block = block;
    }

    renderView(template){
        let block = document.querySelector(this.block);
        block.innerHTML = '';
        for (let v in this.views){
            if (this.views[v]["name"] == template){
                block.innerHTML = this.renderTemplate(this.views[v]["html"]);
                eval(this.views[v]["js"]);
                return 0;
            }
        }
    }

    renderTemplate(html){
        return html;
    }

    addView(array, force=false){
        for (let k in this.views){
            let tview = this.views[v];
            if (tview.name == array.name){
                if (force){
                    this.views = removeItemByIndex(this.views, k);
                    this.views[this.views.length] = array;
                }
            }else{
                this.views[this.views.length] = array;
            }
        }
    }
}
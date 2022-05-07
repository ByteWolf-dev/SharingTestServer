
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
function init(){
    let SRM = new ServerRequestManager();
    let postBtn = document.getElementById('Post');
    let deleteBtn = document.getElementById('Delete');
    let patchBtn = document.getElementById('Patch');

    SRM.LoadItems().then(async () => {
        postBtn.onclick = async () => {
            let testData : ServerData = {text : "Posting Test", done: true, id: SRM.itemsArray.length + 1};
            await SRM.PostData(testData);
        };

        deleteBtn.onclick = async function (){
            await SRM.DeleteFiles(SRM.itemsArray);
            await SRM.LoadItems();
        };

        patchBtn.onclick = async function (){
            let testData : ServerData = {text : "This one was patched!", done: true, id: 3};
            await SRM.PatchData(testData);
        }
    });
    console.log('init done');
}

interface ServerData {
    text : string,
    done : boolean,
    id : number,
}
class ServerRequestManager{
    private fixedUrl = "http://localhost:3000/todos";
    public itemsArray : ServerData[];

    async LoadItems() : Promise<void>{
       this.itemsArray = await this.GetData();
       this.PrintItemText(this.itemsArray);
       alert('finished');
    }

     async GetData() : Promise<ServerData[]> {
        return <ServerData[]> await $.get(this.fixedUrl, function (){
            alert("GET has been executed");
        });
    }
     PrintItemText(items : ServerData[]){
         items.forEach(element => {
             console.log(element);
         })
    }

    async PostData(item : ServerData) : Promise<void>{
        $.ajax({
            url: this.fixedUrl,
            type: 'POST',
            data: JSON.stringify(item),
            contentType: 'application/json',
            processData: false,
            success: _ => {
                this.LoadItems();
            }
        })
    };
    async PatchData(item : ServerData) : Promise<void>{
        let patchUrl = this.fixedUrl + `/${item.id}`;

       $.ajax({
           url: patchUrl,
           type: 'PATCH',
           data: JSON.stringify(item),
           contentType: 'application/json',
           processData: false,
           success: _ => {
               this.LoadItems();
           }
       });
    }

    public async DeleteFiles(items: ServerData[]): Promise<void> {
        for (const file of items) {
            if (file.id !== 1) {
                await this.DeleteProcess(file.id);
            }
        }
    }
    async DeleteProcess(toDeleteID : number) : Promise<void>{
        let deleteUrl = this.fixedUrl + `/${toDeleteID}`;

        $.ajax({
            url: deleteUrl,
            type: 'DELETE',
            contentType: 'application/json',
        })
    }
}

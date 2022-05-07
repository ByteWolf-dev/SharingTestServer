var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
function init() {
    let SRM = new ServerRequestManager();
    let postBtn = document.getElementById('Post');
    let deleteBtn = document.getElementById('Delete');
    let patchBtn = document.getElementById('Patch');
    SRM.LoadItems().then(() => __awaiter(this, void 0, void 0, function* () {
        postBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
            let testData = { text: "Posting Test", done: true, id: SRM.itemsArray.length + 1 };
            yield SRM.PostData(testData);
        });
        deleteBtn.onclick = function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield SRM.DeleteFiles(SRM.itemsArray);
                yield SRM.LoadItems();
            });
        };
        patchBtn.onclick = function () {
            return __awaiter(this, void 0, void 0, function* () {
                let testData = { text: "This one was patched!", done: true, id: 3 };
                yield SRM.PatchData(testData);
            });
        };
    }));
    console.log('init done');
}
class ServerRequestManager {
    constructor() {
        this.fixedUrl = "http://localhost:3000/todos";
    }
    LoadItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.itemsArray = yield this.GetData();
            this.PrintItemText(this.itemsArray);
            alert('finished');
        });
    }
    GetData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield $.get(this.fixedUrl, function () {
                alert("GET has been executed");
            });
        });
    }
    PrintItemText(items) {
        items.forEach(element => {
            console.log(element);
        });
    }
    PostData(item) {
        return __awaiter(this, void 0, void 0, function* () {
            $.ajax({
                url: this.fixedUrl,
                type: 'POST',
                data: JSON.stringify(item),
                contentType: 'application/json',
                processData: false,
                success: _ => {
                    this.LoadItems();
                }
            });
        });
    }
    ;
    PatchData(item) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    DeleteFiles(items) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of items) {
                if (file.id !== 1) {
                    yield this.DeleteProcess(file.id);
                }
            }
        });
    }
    DeleteProcess(toDeleteID) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteUrl = this.fixedUrl + `/${toDeleteID}`;
            $.ajax({
                url: deleteUrl,
                type: 'DELETE',
                contentType: 'application/json',
            });
        });
    }
}
//# sourceMappingURL=Main.js.map
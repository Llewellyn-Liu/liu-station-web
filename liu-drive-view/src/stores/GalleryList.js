import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useGalleryListStore = defineStore('gallery-list', {
    state: () => ({
        list: [{
            "filename": "屏幕截图 2023-09-04 223821.png",
            "url": "test_id/屏幕截图 2023-09-04 223821.png",
            "userId": "test_id",
            "tags": "",
            "author": "test_id",
            "accessibility": 2,
            "type": "image/png",
            "scale": 1,
            "dateCreated": "2023-10-19 07:58:31.718943"
        }, {
            "filename": "屏幕截图 2023-09-26 193020.jpg",
            "url": "test_id/屏幕截图 2023-09-26 193020.jpg",
            "userId": "test_id",
            "tags": "",
            "author": "test_id",
            "accessibility": 2,
            "type": "image/jpeg",
            "scale": 2,
            "dateCreated": "2023-10-19 07:58:37.160641"
        }, {
            "filename": "屏幕截图(7).png",
            "url": "test_id/屏幕截图(7).png",
            "userId": "test_id",
            "tags": "",
            "author": "test_id",
            "accessibility": 2,
            "type": "image/png",
            "scale": 2,
            "dateCreated": "2023-10-19 07:58:43.184809"
        }, {
            "filename": "屏幕截图(19).png",
            "url": "test_id/屏幕截图(19).png",
            "userId": "test_id",
            "tags": "",
            "author": "test_id",
            "accessibility": 2,
            "type": "image/png",
            "scale": 2,
            "dateCreated": "2023-10-19 07:58:49.305375"
        }, {
            "filename": "原神 2023-09-28 16-50-24.mp4",
            "url": "test_id\\原神 2023-09-28 16-50-24.mp4",
            "userId": "test_id",
            "tags": "anc",
            "author": "lrl",
            "accessibility": 0,
            "type": "video/mp4",
            "scale": 1,
            "dateCreated": "2023-10-19 07:59:08.111311"
        }],
        size: 0,
    }),
    getters: {
        getList: function (state) {
            return state.list
        }
    },
    actions: {
        setList(fileList) {
            this.list = fileList;
        }
    }
})
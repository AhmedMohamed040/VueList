// filters for tasks 
var filters = {
    // to show all tasks
    all: function(task) {
        return task;
    },
    // to show just the complete tasks
    complete: function(list) {
        return list.filter((task) => { return task.complete; })
    },
    // to show just the incomplete tasks
    incomplete: (list) => { return list.filter((task) => { return !task.complete; }) }
}


// local storage 
var storageKey = "v-list";
var itemStorage = {
    // to get the items from Local storage
    fetch: function() {
        let items = JSON.parse(localStorage.getItem(storageKey) || "[]");
        return items;
    },
    // to save the items in local storage
    save: function(items) {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }
}

// vue app 
var app = new Vue({
    el: '#app',
    data: {

        tasks: "",
        visibility: "all",
        list: itemStorage.fetch(),
    },
    watch: {
        list: {
            handler: function(items) {
                itemStorage.save(items);

            }
        }
    },
    computed: {
        filterTasks: function() {

            return filters[this.visibility](this.list);
        }
    },
    methods: {

        addTask: function(e) {
            e.preventDefault();
            if (this.tasks) {
                this.list.push({
                    text: this.tasks,
                    complete: false,
                    id: 'id' + Date.now(),
                    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()

                });


            }
            this.tasks = '';
        },
        toggleTasks: function(task) { task.complete = !task.complete; },
        filtersTasks: function(filter) { this.visibility = filter; },
        removeTask: function(index) {

            this.list.splice(index, 1);
        }

    }
});
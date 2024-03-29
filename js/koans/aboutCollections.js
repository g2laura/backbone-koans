describe('About Backbone.Collection', function() {
    it('Can add Model instances as objects one at a time, or as arrays of models.', function() {
        var todos = new TodoList();

        expect(todos.length).toBe(0);

        todos.add({ text: 'Clean the kitchen' });

        expect(todos.length).toBe(1);

        // How would you add multiple models to the collection with a single method call?
        todos.add([{ text: 'text'}, {text: 'text2'}]);
        expect(todos.length).toBe(3);
    });

    it('Can have a comparator function to keep the collection sorted.', function() {
        var todos = new TodoList();

        // Without changing the sequence of the Todo objects in the array, how would you
        // get the expectations below to pass?
        //
        // How is the collection sorting the models when they are added? (see TodoList.comparator in js/todos.js)
        //
        // Hint: Could you change attribute values on the todos themselves?

        todos.add([{ text: 'Clean the house', order: 4},
                   { text: 'Do the laundry',  order: 3},
                   { text: 'Take a nap',      order: 5}]);

        expect(todos.at(0).get('text')).toEqual('Do the laundry');
        expect(todos.at(1).get('text')).toEqual('Clean the house');
        expect(todos.at(2).get('text')).toEqual('Take a nap');
    });

    // How are you supposed to know what Backbone objects trigger events? To the docs!
    // http://documentcloud.github.com/backbone/#FAQ-events

    it('Fires custom named events when the contents of the collection change.', function() {
        var todos = new TodoList();

        var addModelCallback = jasmine.createSpy('-add model callback-');
        todos.on('add', addModelCallback);
        todos.add({text:"New todo"});
        // How would you get both expectations to pass with a single method call?

        expect(todos.length).toEqual(1);
        expect(addModelCallback).toHaveBeenCalled();
    });

    it('Can remove items from the collection.', function() {
        var todos = new TodoList({ text: 'Iron your tights'});

        var removeModelCallback = jasmine.createSpy('-remove model callback-');
        todos.on('remove', removeModelCallback);
        todos.remove(todos.last());
        // How would you get both expectations to pass with a single method call?

        expect(todos.length).toEqual(0);
        expect(removeModelCallback).toHaveBeenCalled();
    });
});

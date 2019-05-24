function Person(name, foods) {
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.foods), 2000);
    });
};

describe('mocking learning', () => {
    it('mock a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('snikers');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('snikers');
        expect(fetchDogs).toHaveBeenCalledTimes(1);
    });

    it('can create a person', () => {
        const me = new Person('Vladimir', ['meat', 'eggs']);
        expect(me.name).toBe('Vladimir');
    });
    it('can fetch foods', async () => {
        const me = new Person('Vladimir', ['meat', 'eggs']);
        //mock tje favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['meat', 'eggs']);
        const favFoods = await me.fetchFavFoods();

        expect(favFoods).toContain('meat');
    });
});
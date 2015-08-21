var PizzaModel = (function () {
    return {
        pizza: [
            {
               id: 1, name: "holland", date: "4.8.15", photo: "../../images/holland.png", diameter: 25, ingredients: [
                                        { id: 1, count: 1 },
                                        { id: 2, count: 3 },
                                        { id: 5, count: 2 },
                                        { id: 9, count: 2 },
                                        { id: 12, count: 1 },
                                        { id: 15, count: 1 }]
            },
        {
            id: 2, name: "german", date: "4.8.15", photo: "../../images/german.jpg", diameter: 25, ingredients: [
                                    { id: 1, count: 1 },
                                    { id: 3, count: 3 },
                                    { id: 6, count: 2 },
                                    { id: 11, count: 1 },
                                    { id: 13, count: 2 },
                                    { id: 20, count: 2 }]
        },
        {
            id: 3, name: "french", date: "4.8.15", photo: "../../images/french.jpg", diameter: 25, ingredients: [
                                    { id: 1, count: 1 },
                                    { id: 4, count: 2 },
                                    { id: 9, count: 2 },
                                    { id: 15, count: 2 },
                                    { id: 18, count: 2 },
                                    { id: 21, count: 2 }]
        },
        {
            id: 4, name: "italian", date: "4.8.15", photo: "../../images/italian.jpg", diameter: 25, ingredients: [
                                    { id: 1, count: 1 },
                                    { id: 3, count: 2 },
                                    { id: 7, count: 2 },
                                    { id: 10, count: 3 },
                                    { id: 14, count: 2 },
                                    { id: 23, count: 2 }]
        },
        {
            id: 5, name: "belarusian", date: "4.8.15", photo: "../../images/belarusian.jpg", diameter: 25, ingredients: [
                                    { id: 1, count: 1 },
                                    { id: 2, count: 8 },
                                    { id: 5, count: 2 },
                                    { id: 12, count: 2 },
                                    { id: 18, count: 2 },
                                    { id: 19, count: 2 },
                                    { id: 21, count: 4 },
                                    { id: 24, count: 4 }]
        }],
        diameter:
            [25, 30, 35, 40]
    }
})();
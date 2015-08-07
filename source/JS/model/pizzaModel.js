var PizzaModel = (function () {
    return {
        pizza: [
            {
                name: "holland", date: "4.8.15", photo: "../../images/holland.png", diameter: 25, ingredients: [
                                        {section: "base", id: 1, count: 1},
                                        {section: "sauce", id: 2, count: 3},
                                        {section: "meat", id: 2, count: 2},
                                        {section: "vegetables", id: 3, count: 2},
                                        {section: "seafood", id: 2, count: 1},
                                        {section: "cheese", id: 3, count: 1},
                                        {section: "seasonigs", id: 3, count: 2}]
            },
        {
            name: "german", date: "4.8.15", photo: "../../images/german.jpg", diameter: 25, ingredients: [
                                    {section: "base", id: 1, count: 1},
                                    {section: "sauce", id: 3, count: 3},
                                    {section: "meat", id: 1, count: 2},
                                    {section: "vegetables", id: 2, count: 1},
                                    {section: "cheese", id: 2, count: 2},
                                    {section: "seasonigs", id: 3, count: 2}]
        },
        {
            name: "french", date: "4.8.15", photo: "../../images/french.jpg", diameter: 25, ingredients: [
                                    {section: "base", id: 1, count: 1},
                                    {section: "sauce", id: 1, count: 2},
                                    {section: "meat", id: 3, count: 2},
                                    {section: "cheese", id: 3, count: 2},
                                    {section: "seasonigs", id: 3, count: 2}]
        },
        {
            name: "italian", date: "4.8.15", photo: "../../images/italian.jpg", diameter: 25, ingredients: [
                                    {section: "base", id: 1, count: 1},
                                    {section: "meat", id: 3, count: 2},
                                    {section: "vegetables", id: 4, count: 2},
                                    {section: "seafood", id: 1, count: 3},
                                    {section: "cheese", id: 1, count: 2},
                                    {section: "seasonigs", id: 3, count: 2}]
        },
        {
            name: "belarusian", date: "4.8.15", photo: "../../images/belarusian.jpg", diameter: 25, ingredients: [
                                    {section: "base", id: 1, count: 1},
                                    {section: "meat", id: 2, count: 2},
                                    {section: "vegetables", id: 3, count: 2},
                                    {section: "vegetables", id: 4, count: 2},
                                    {section: "vegetables", id: 5, count: 2},
                                    {section: "cheese", id: 3, count: 4}]
        }],
        diameter:
            [25, 30, 35, 40]
    }
})();
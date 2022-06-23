require('dotenv').config();
const openAI = require('../lib/openAI');

const article = `
Travel Tips

A major part of traveling is getting from place to place. Whether you are abroad or traveling in the US, there are multiple transportation options to choose from. A fantastic part of traveling is experiencing new forms of transportation, all while trying to figure out how to get from point A to point B on your itinerary. Sometimes it works out and other times you have to keep an open mind if you end up getting lost (it just might lead you to an unexpected discovery).

When studying abroad in Copenhagen for a semester, I was able to travel all around Europe. From my experiences of European travels mixed with my US travels, I was able to put together a list of the top ten modes of transportation used when traveling.

1. Walking

The easiest (and cheapest) form of transportation is to just walk. A lot of cities are super easy to explore on foot. Being on the streets lets you see a lot of cool and beautiful architecture, experience the people around you, and take more of the city in than compared to being in the back seat of a taxi or behind closed doors on a subway. Just make sure you to look out for bikes/cars and always use crosswalks when crossing streets.

Walking on trails through Copenhagen
2. Biking

Do a quick google search and see if you’re traveling in a city that is biker friendly. It’s a bit faster than walking and super fun. Many of the major cities will have a bike sharing service, such as Donkey Republic (major European Cities), CitiBike (NYC), and Divvy (Chicago). Another option is taking a bike tour of a city. Just don’t forget to rent a helmet!

Bikes in Amsterdam
3. Cars

Whether you rent a car, drive your own, use a ride share app, or take a taxi, driving is another simple way to travel around. Especially in big cities you may not be the most familiar with, hopping in an Uber, Lyft, or taxi may keep you from getting lost. Road tripping is another incredible way to travel around. You can check out a few previous BTB articles, giving you tips on staying fresh on the road and ideas on how you can live out of your vehicle.

Driving through Arizona
Driving through Keuka, NY

4. Trains

Trains are a nice and easy way to get to where you need to go. Whether you’re commuting to a city or going home from RIT for a school break; trains are roomy, convenient, and give you some time to relax. Remember to bring something to do such as a book to read, music, or a movie if you have a long trip ahead of you. Some trains even have WiFi and other commodities. During my daily commute into Copenhagen for class, one of my favorite things to do was watch the scenery pass outside my window. Just make sure to always have your ticket handy if a ticket inspector comes by.

Train in Copenhagen
5. Buses

Whether you’re taking a public bus, a charter bus across a country or a hop-on-hop-off tourist bus, there are a few things to remember. For public transportation, always have cash or coins to pay for a ticket when you board (it’s rare they take credit cards) and hit the stop button before your stop to indicate to the driver you need to get off. If you are taking a chartered bus, make sure you are on time and double check that you’re getting on the right one. Hop-on-hop-off buses are another exciting way to see a city. They run right on schedule, so don’t be late and always keep the schedule handy.

Double Decker bus in England

6. Boats

Some cities have boats included in their public transportation. From huge ferries to small boat tours, this mode of transportation provides a unique view of the city and is definitely worth checking out. Some European countries offer ferry rides from country to country, giving you an interesting and unique alternative to flying. If the city you’re visiting is surrounded by water, check out some boat tours, and see what type of excursions are offered. Spending a little extra money for a boat tour (or even a sailing trip) will help you you’ll learn a lot about the area, get awesome pictures, and have loads of fun.

Ferry in Helsinki, Finland
7. Subways

The metro/subway can be a quick way to avoid some walking. Just make sure to take a look at the map and figure out which direction you need to go to before jumping aboard. Most systems are easy to follow, especially now with Google and other map apps working cohesively with them. While aboard, remain vigilant - especially when it’s crowded, so you remember when to get off. The subways move fast and it can be easy to miss your stop.

Subway in London
8. Aerial Tramways

If you’re willing to face your fear of heights or already love being on the top of mountains, this a perfect way to see the view. Aerial Tramways come in all different sizes, from fitting a few people to upwards of a hundred people. They are an enjoyable and thrilling way to soar up to a mountain. Aerial Tramways provide an exceptional view of the city and the terrain around you. It may cost you a little bit of money, but the view will definitely be worth it.

Aerial Tram in Chur, Switzerland
9. Flying

Flying is a great way to get yourself to a major city and start your adventure. Airplanes get you places fast and are the most versatile mode of transportation, taking you across states, across countries, and across waters. It’s good to pack some snacks, a neck pillow, and definitely, something to do on a flight…no matter the distance. If you are planning on taking a long flight, you can read a previous BTB article giving you some pointers on how to survive the trip.

Flying over Kingston, Jamacia

10. Funiculars

A great alternative to aerial tramways is funiculars. These railways use cable traction to move on steeply inclined slopes, moving cars up and down hills and mountains. Plus, you’re technically always on the ground (just on an angle), so it’s perfect for those afraid of heights. You avoid climbing a steep hill yourself and it provides a unique advantage point of the city. Usually, the cars overlook a city, giving the riders a one-of-a-kind view.

View from a funicular in Bergen, Norway

Along with this list of some of the top modes of transportation, another great tip is to look into a weekend/short-term public transportation passes for the city you’re in. Many cities offer discounts or packages to help you save some money and keep from worrying about having to constantly get new tickets. Some cities even have a tourist card that will get you public transportation, as well as free/discounted admission into museums.


Exploring various modes of transportations is a fun, exciting way to discover new things about a city and change up your traveling habits. The right mode for you will depend on the city you're in, what type of experience you’re looking to have and your own personal preferences. We recommend trying out as many as you can during your traveling adventures. Don’t knock it, till you try it!



Tagged: rit study abroad, student life, study abroad, travel, travel tips`

openAI.summarize(article).then(console.log);
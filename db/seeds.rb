# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Event.create(
    eventTitle: 'SCEC Semester Open',
    eventStartDate: DateTime.new(2021,10,3,17,0,0),
    eventEndDate: DateTime.new(2021,10,3,18,0,0),
    eventDescription: 'Default Description',
    eventLocation: 'ZACH 213'
 )

 Event.create(
     eventTitle: 'Meeting Week 1',
     eventStartDate: DateTime.new(2021,10,3,17,0,0),
     eventEndDate: DateTime.new(2021,10,3,18,0,0),
     eventDescription: 'Default Description',
     eventLocation: 'Zoom'
  )

  Event.create(
      eventTitle: 'Meeting Week 2',
      eventStartDate: DateTime.new(2021,10,3,17,0,0),
      eventEndDate: DateTime.new(2021,10,3,18,30,0),
      eventDescription: 'Default Description',
      eventLocation: 'MSC 3100'
   )

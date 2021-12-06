# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

member = Member.create([
                        #  {
                        #    admin: 1,
                        #    first_name: 'Steve',
                        #    last_name: 'Jobs',
                        #    email: 'steve.jobs@mail.com',
                        #    description: 'apple woo',
                        #    paid_dues: 1,
                        #    total_attendance: 2
                        #  },

                        #  {
                        #    admin: 0,
                        #    first_name: 'Frodo',
                        #    last_name: 'Baggins',
                        #    email: 'frodo.baggins@hobbit.com',
                        #    description: 'me short',
                        #    paid_dues: 0,
                        #    total_attendance: 2
                        #  },

                        #  {
                        #    admin: 0,
                        #    first_name: 'Steve',
                        #    last_name: 'Wozniak',
                        #    email: 'swozniak@mail.com',
                        #    description: 'woo apple',
                        #    paid_dues: 0,
                        #    total_attendance: 1
                        #  }, 

                         {
                           admin: true, 
                           first_name: 'Noah', 
                           last_name: 'Miner', 
                           email: 'noahjminer@tamu.edu', 
                           paid_dues: 0,
                           member: 1, 
                           total_attendance: 2
                         }
                       ])

event = Event.create([
                       {
                         title: 'SCEC Meeting 1',
                         start_date: Time.new(2021, 11, 1, 11, 00, 0o0, '-06:00'),
                         end_date: Time.new(2021, 11, 1, 12, 00, 0o0, '-06:00'),
                         description: 'This meeting occurred in the past.',
                         # avg_rating: 4.4,
                         location: 'Zoom'
                       },

                       {
                         title: 'SCEC Meeting 2',
                         start_date: Time.new(2021, 11, 6, 19, 00, 0o0, '-06:00'),
                         end_date: Time.new(2021, 11,19, 20, 00, 0o0, '-06:00'),
                         description: 'This meeting is currently happening.',
                         # avg_rating: 4.8,
                         location: 'MS Teams'
                       },

                       {
                         title: 'SCEC Meeting 3',
                         start_date: Time.new(2021, 11, 20, 19, 30, 0o0, '-06:00'),
                         end_date: Time.new(2021, 11, 20, 20, 00, 0o0, '-06:00'),
                         description: 'This meeting will happen in the future.',
                         # avg_rating: 2.5,
                         location: 'ZACH 213'
                       }
                     ])

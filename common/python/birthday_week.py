#!/usr/bin/env python3
#-*- coding: utf-8 -*-

import datetime

def weeks_of_year(year):
  # NOTE: https://stackoverflow.com/questions/29262859
  last_week = datetime.date(year, 12, 28)
  return last_week.isocalendar()[1]

def weeks_of_date(date):
  year, week_num, day_of_week = date.isocalendar()
  return week_num

def get_date(string):
  return datetime.datetime.strptime(string, "%Y-%m-%d")


def days_of_life(birthday):
  my_today = datetime.datetime.combine(datetime.date.today(), datetime.datetime.min.time())

  # NOTE: NOT my_today = datetime.date.today()
  # https://stackoverflow.com/questions/72153849
  
  days = (my_today - birthday).days + 1
  return days


if __name__ == "__main__":
  birthday = input("Input your birthday(year-month-day):\n")
  try:
    my_birthday = get_date(birthday)
  except:
    my_birthday = get_date("2001-08-07")

  my_today = datetime.date.today()
  ans_weeks = 0
  ans_month = 0

  ans_weeks += weeks_of_year(my_birthday.year) - weeks_of_date(my_birthday)
  ans_month += 12 - my_birthday.month + 1
  for year in range(my_birthday.year+1, my_today.year):
    ans_weeks += weeks_of_year(year)
    ans_month += 12

  print("Month #" + str(ans_month+ my_today.month))
  print("Week  #" + str(ans_weeks + weeks_of_date(my_today)))
  print("Day   #" + str(days_of_life(my_birthday)))
  print("Age   #" + str(round((ans_month+ my_today.month)/12, 2)))

# Import necessary packages
from random import randrange, choice, choices
from datetime import date, time, datetime, timedelta
from os import getcwd, chdir

# Change working directory to be where files are stored
# Assumes the script is being run from somewhere within the project-2-905_02 repository
cwd = getcwd()
new_wd = cwd[:cwd.rindex('project-2-905_02') + len('project-2-905_02')] # Trim to base directory of repository
if '\\' in cwd: # For Windows
    new_wd += '\\data\\files'
else:
    new_wd += '/data/files'
chdir(new_wd)

# Arrays for storing table information
menu = []
employees = []

# Open files to be generated and write headers
trans_f = open('Transactions.csv', 'w', encoding='utf-8-sig')
trans_f.write('Transaction_ID,Time,Employee_ID,Total_Price')
ol_f = open('Order_List.csv', 'w', encoding='utf-8-sig')
ol_f.write('Order_List_ID,Item_ID,Transaction_ID')

# Variables to keep track of important attributes
transaction_id = 1
order_list_id = 1
total_price = 0


# Loads the employees from Employees.csv
def load_employees():
    with open('Employees.csv', encoding='utf-8-sig') as emp_csv:
        # Determine index of ID, Price, and Is_Modification columns
        col_names = emp_csv.readline().strip().split(',')
        try:
            id_col = col_names.index('Employee_ID')
            manager_col = col_names.index('Is_Manager')
        
        except:
            print('Necessary columns not found in Employees.csv')
            exit(1)
        
        # Add all non-manager employees to the array
        split_lines = [line.strip().split(',') for line in emp_csv.readlines()]
        employees.extend([int(line[id_col]) for line in split_lines if (line[manager_col] == 'FALSE')])


# Loads the menu from Menu.csv
def load_menu():
    with open('Menu.csv', encoding='utf-8-sig') as menu_csv:
        # Determine index of ID, Price, and Is_Modification columns
        col_names = menu_csv.readline().strip().split(',')
        try:
            id_col = col_names.index('Item_ID')
            price_col = col_names.index('Price')
            mod_col = col_names.index('Is_Modification')
        
        except:
            print('Necessary columns not found in Menu.csv')
            exit(1)
        
        # Add all non-modification menu items to the array
        split_lines = [line.strip().split(',') for line in menu_csv.readlines()]
        menu.extend([(int(line[id_col]), float(line[price_col])) for line in split_lines if (line[mod_col] == 'FALSE')])


# Get start date (400 days ago)
def get_start_date():
    day_diff = timedelta(days=400)
    curr_date = date.today()
    return curr_date - day_diff


# Generate a single random transaction
def get_random_transaction(curr_time, is_peak_day, curr_emp):
    global transaction_id, order_list_id, total_price

    # Build order
    num_items = randrange(10 if is_peak_day else 1, 20 if is_peak_day else 10)
    items = choices(menu, k = num_items)
    transaction_price = 0
    for item in items:
        ol_f.write('\n{:d},{:d},{:d}'.format(order_list_id, item[0], transaction_id))
        transaction_price += item[1]
        order_list_id += 1
    

    # Add transaction to list
    trans_f.write('\n{:d},{},{:d},{:.2f}'.format(transaction_id, curr_time.strftime('%Y-%m-%d %H:%M:%S'), curr_emp, transaction_price))

    # Update tracking statistics and running indices
    total_price += transaction_price
    transaction_id += 1


# Generate single day of transactions
def generate_day(curr_day, is_peak_day):
    day_start = datetime.combine(curr_day, time())
    curr_emp = choice(employees)

    # Determine possible amount of orders per hour based on time of day and peak day status
    high_volume_hrs = [12, 13, 14, 20, 21]
    per_hr_list_low = [10, 15, 20] if is_peak_day else [6, 10]
    per_hr_list_high = [30, 60] if is_peak_day else [10, 15, 20] 

    # Generate transactions for each day
    for hr in range(11, 22): # Open from 11 am - 10 pm
        # Choose number of orders to generate for this hour and generate the orders
        orders_per_hr = choice(per_hr_list_high) if (hr in high_volume_hrs) else choice(per_hr_list_low)
        for order in range(0, orders_per_hr):
            time_diff = timedelta(hours=hr, minutes=randrange(order * (60/orders_per_hr), (order+1) * (60/orders_per_hr)), seconds=randrange(0,60))
            get_random_transaction(day_start + time_diff, is_peak_day, curr_emp)


# Select two random days to be peak days
def select_peak_days():
    day_one = randrange(0, 400)
    day_two = randrange(0, 400)

    while (day_one == day_two):
        day_two = randrange(0, 400)
    
    return (day_one, day_two)


# Generate full transaction history
def generate_transactions():
    curr_day = get_start_date()
    peak_days = select_peak_days()

    for day in range(0, 400):
        generate_day(curr_day, day in peak_days)

        curr_day += timedelta(days=1)


def main():
    print('Starting transactions generation...')

    # Load necessary tables
    load_employees()
    load_menu()

    # Generate transaction files
    generate_transactions()

    # Close generate files
    trans_f.close()
    ol_f.close()

    # Print results of generation
    print('\nTransactions generation completed.')
    print('Number of transactions placed:', transaction_id - 1)
    print('Number of items ordered:', order_list_id - 1)
    print('Total price of all transactions:', round(total_price, 2))


if (__name__ == "__main__"):
    main()
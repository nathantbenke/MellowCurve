#
# database
# by chelsea & alexa
#

import mysql.connector

# this class represents a sample
class Sample:
    # constructor
    # id:           unique integer sample id
    # name:         string name that the sample is referred to as
    # audio:        blob file
    # sample_owner: unique integer user id of who uploaded the sample
    def __init__(self, id, name, audio, sample_owner):
        self.id = id
        self.name = name
        self.audio = audio
        self.sample_owner = sample_owner
        
    # prints formatted sample
    def __str__(self):
        return "sample " + str(self.id) + ": '" + self.name + "' accessed by user " + str(self.sample_owner)

# creates samples and user_permissions tables
# removes old tables if they exist
# cnx:  the database connection
def create_tables(cnx):
    cursor = cnx.cursor()
    
    cursor.execute("DROP TABLE IF EXISTS user_permissions")
    cursor.execute("DROP TABLE IF EXISTS samples")
        
    create_sample_table = ("""
        CREATE TABLE samples (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            audio_blob LONGBLOB NOT NULL,
            owner INT
        )""")
    create_user_permissions_table = ("""
        CREATE TABLE user_permissions (
            user_id INT,
            sample_id INT,
            PRIMARY KEY (user_id, sample_id),
            FOREIGN KEY (sample_id) REFERENCES Samples(id)
            ON DELETE CASCADE
        )""")
    cursor.execute(create_sample_table)
    cursor.execute(create_user_permissions_table)
    
    cnx.commit()
    cursor.close()

# inserts a sample into the database.
# cnx:          the database connection
# sample_id:    the id of the sample
# sample_name:  the name of the sample
# file_name:    direct path to the file
# sample_owner: user_id of who uploaded the sample
def insert_sample(cnx, sample_id, sample_name, file_name, sample_owner):
    cursor = cnx.cursor()
    
    # turns file_name into BLOB so it can be added to db
    with open(file_name, 'rb') as file:
        audio_blob = file.read()
    # inserts sample into samples table
    samples_query = ("INSERT INTO samples "
            "(id, name, audio_blob, owner) "
            "VALUES (%s, %s, %s, %s)")
    samples_data = (sample_id, sample_name, audio_blob, sample_owner)
    cursor.execute(samples_query, samples_data)
    cnx.commit()
    
    # inserts owner into user_permissions table
    users_query = ("INSERT INTO user_permissions "
            "(user_id, sample_id) "
            "VALUES (%s, %s)")
    users_data = (sample_owner, sample_id)
    cursor.execute(users_query, users_data)
    cnx.commit()
    
    cursor.close()
    
# gives a user access to a sample by adding the
# ids to user_permissions table
# cnx:          the database connection
# user_id:      the id of the user
# sample_id:    the id of the sample
def share_sample(cnx, user_id, sample_id):
    cursor = cnx.cursor()
    query = ("INSERT INTO user_permissions "
            "(user_id, sample_id) "
            "VALUES (%s, %s)")
    data = (user_id, sample_id)
    cursor.execute(query, data)
    cnx.commit()
    cursor.close()
    
# removes access to a sample from a user by
# removing the record from user_permissions table
# cnx:          the database connection
# user_id:      the id of the user
# sample_id:    the id of the sample
def hide_sample(cnx, user_id, sample_id):
    cursor = cnx.cursor()
    query = ("DELETE FROM user_permissions "
            "WHERE user_id = %s AND sample_id = %s")
    data = (user_id, sample_id)
    cursor.execute(query, data)
    cnx.commit()
    cursor.close()
    
# removes a sample from both samples
# and user_permissions tables
# cnx:          the database connection
# sample_id:    the id of the sample
def remove_sample(cnx, sample_id):
    cursor = cnx.cursor()
    query = ("DELETE FROM samples "
            "WHERE id = " + sample_id)
    cursor.execute(query)
    cnx.commit()
    cursor.close()

# returns list of all samples a user has access to
# cnx:  the database connection
# user: the user id to search for
def get_user_samples(cnx, user):
    samples = []
    cursor = cnx.cursor()
    
    query = ("SELECT * FROM user_permissions U, samples S "
            "WHERE U.user_id = " + user + " AND S.id = U.sample_id")
    cursor.execute(query)
    result = cursor.fetchall()
    for r in result:
        samples.append(Sample(id=r[2],name=r[3],audio=r[1],sample_owner=r[0]))
        
    cursor.close()
    return samples
    
# establish database connection
# adjust user/password/host/database as necessary
cnx = mysql.connector.connect(user="root", password="password", database="samples")
# run queries
create_tables(cnx)
insert_sample(cnx, "1", "bird noises", "./birdnoises.mp3", "101")
insert_sample(cnx, "2", "more bird noises", "./birdnoises.mp3", "102")
insert_sample(cnx, "3", "noises", "./birdnoises.mp3", "102")
insert_sample(cnx, "4", "birds?", "./birdnoises.mp3", "101")
share_sample(cnx, "101", "2")
hide_sample(cnx, "102", "3")
remove_sample(cnx, "4")
# check results
samples_101 = get_user_samples(cnx, "101")
samples_102 = get_user_samples(cnx, "102")
for sample in samples_101:
    print(sample)
for sample in samples_102:
    print(sample)
# close connection
cnx.close()

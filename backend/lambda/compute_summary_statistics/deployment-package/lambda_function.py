import boto3
import io
import json
import pandas as pd

# S3 does not require authentication on Lambda because you are already signed in to the management console.
# For local testing, make sure AWS CLI is configured
s3 = boto3.client('s3')

# Bucket and key configuration
SUMMARY_STATISTICS_BUCKET = 'dataflow-summary-statistics-bucket'
DATASET_BUCKET = 'dataflow-development-bucket'

def lambda_handler(event, context):
    DATASET_KEY = event["Records"][0]['s3']['object']['key']
    SUMMARY_STATISTICS_KEY = 'summary/' + (DATASET_KEY.split('/')[1].split('.csv')[0]) + '.json'

    # This reads the object stream and decodes into a string to be read as a CSV into pd dataframe
    csv = s3.get_object(Bucket=DATASET_BUCKET, Key=DATASET_KEY)['Body'].read().decode('utf-8')
    csv = io.StringIO(csv)
    df = pd.read_csv(csv)

    response = {}

    # Compute numeric summary statistics first
    summary = df.select_dtypes(include=['number']).describe()
    for col in summary.columns:
        response[col] = dict(summary[col])

    for col in df.columns:
        if col not in summary.columns:
            response[col] = {
                'avg_length': df[col].str.len().mean(), # Average length
                'avg_words': df[col].str.split(' ').str.len().mean(), # Average words
                'avg_capitals': df[col].str.count(pat='[A-Z]').mean(), # Average capitals
                'avg_symbols': df[col].str.count(pat='[^a-zA-Z0-9\s]').mean() # Average symbols
            }

    json_data = json.dumps(response)

    # Upload to s3 summary statistics bucket
    response = s3.put_object(Key=SUMMARY_STATISTICS_KEY, Bucket=SUMMARY_STATISTICS_BUCKET, Body=json_data)

    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        print('Summary statistics successfully computed and uploaded')

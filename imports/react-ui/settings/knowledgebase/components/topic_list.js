import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import Sidebar from '../../Sidebar';
import Row from './row';
import { CommonList } from './common';

const propTypes = {
  kbTopics: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  removeKbTopic: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

class TopicList extends CommonList {
  constructor(props) {
    super(props);
  }

  renderItems() {
    const { items, removeItem } = this.props;

    return items.map(item => <TopicRow key={item._id} item={item} removeItem={removeItem} />);
  }

  getHeader() {
    const breadcrumb = [
      { title: 'Topics', link: '/settings/knowledgebase' },
      { title: 'Categories' },
    ];

    return <Wrapper.Header breadcrumb={breadcrumb} />;
  }

  getActionBar() {
    const actionBarLeft = (
      <Button bsStyle="link" href={FlowRouter.path('settings/knowledgebase/add')}>
        <i className="ion-plus-circled" /> Add topic
      </Button>
    );

    return <Wrapper.ActionBar left={actionBarLeft} />;
  }

  getContent() {
    const { loadMore, hasMore } = this.props;

    return (
      <Pagination loadMore={loadMore} hasMore={hasMore}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>Brand</th>
              <th width="183" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </Table>
      </Pagination>
    );
  }
}

TopicList.propTypes = propTypes;

export default TopicList;
